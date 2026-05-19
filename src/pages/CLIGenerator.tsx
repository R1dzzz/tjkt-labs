import { useState, useCallback } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Terminal, Copy, Download, Wand2, Check } from 'lucide-react';

type ConfigType = 'static' | 'dhcp' | 'vlan' | 'static-route' | 'rip' | 'nat' | 'subnetting';

interface CLIConfigOption {
  id: ConfigType;
  label: string;
}

const configTypes: CLIConfigOption[] = [
  { id: 'static', label: 'Static IP Configuration' },
  { id: 'dhcp', label: 'DHCP Server' },
  { id: 'vlan', label: 'VLAN Configuration' },
  { id: 'static-route', label: 'Static Routing' },
  { id: 'rip', label: 'RIP Routing' },
  { id: 'nat', label: 'NAT Configuration' },
  { id: 'subnetting', label: 'Subnetting Helper' },
];

function generateStaticIP(ip: string, subnet: string, gateway: string, interface_: string): string {
  return `! Static IP Configuration
! Interface: ${interface_}
! IP Address: ${ip}
! Subnet Mask: ${subnet}
! Default Gateway: ${gateway}

enable
configure terminal

interface ${interface_}
 ip address ${ip} ${subnet}
 no shutdown
 exit

ip default-gateway ${gateway}

end
write memory

! Configuration complete. Verify with:
! show ip interface brief
! show running-config interface ${interface_}`;
}

function generateDHCP(pool: string, network: string, subnet: string, gateway: string, dns: string, startIp: string, endIp: string): string {
  return `! DHCP Server Configuration
! Pool Name: ${pool}
! Network: ${network}
! Subnet Mask: ${subnet}
! Default Gateway: ${gateway}
! DNS Server: ${dns}

enable
configure terminal

ip dhcp pool ${pool}
 network ${network} ${subnet}
 default-router ${gateway}
 dns-server ${dns}

ip dhcp excluded-address ${startIp} ${endIp}

end
write memory

! Configuration complete. Verify with:
! show ip dhcp pool
! show ip dhcp binding`;
}

function generateVLAN(vlanId: string, vlanName: string, interface_: string): string {
  return `! VLAN Configuration
! VLAN ID: ${vlanId}
! VLAN Name: ${vlanName}
! Interface: ${interface_}

enable
configure terminal

vlan ${vlanId}
 name ${vlanName}
 exit

interface ${interface_}
 switchport mode access
 switchport access vlan ${vlanId}
 no shutdown
 exit

end
write memory

! Configuration complete. Verify with:
! show vlan brief
! show vlan id ${vlanId}`;
}

function generateStaticRoute(dest: string, subnet: string, nextHop: string): string {
  return `! Static Route Configuration
! Destination: ${dest}
! Subnet Mask: ${subnet}
! Next Hop: ${nextHop}

enable
configure terminal

ip route ${dest} ${subnet} ${nextHop}

end
write memory

! Configuration complete. Verify with:
! show ip route static
! show running-config | include ip route`;
}

function generateRIP(network: string): string {
  return `! RIP Routing Configuration
! Network: ${network}

enable
configure terminal

router rip
 version 2
 network ${network}
 no auto-summary

end
write memory

! Configuration complete. Verify with:
! show ip protocols
! show ip route rip`;
}

function generateNAT(interfaceIn: string, interfaceOut: string, insideNetwork: string, insideSubnet: string): string {
  return `! NAT Configuration
! Inside Interface: ${interfaceIn}
! Outside Interface: ${interfaceOut}
! Inside Network: ${insideNetwork} ${insideSubnet}

enable
configure terminal

interface ${interfaceIn}
 ip nat inside
 exit

interface ${interfaceOut}
 ip nat outside
 exit

access-list 1 permit ${insideNetwork} ${insideSubnet}

ip nat inside source list 1 interface ${interfaceOut} overload

end
write memory

! Configuration complete. Verify with:
! show ip nat translations
! show ip nat statistics`;
}

function generateSubnetting(ip: string, cidr: string): string {
  const cidrNum = parseInt(cidr);
  const hostBits = 32 - cidrNum;
  const totalHosts = Math.pow(2, hostBits);
  const usableHosts = totalHosts - 2;
  
  const subnetMaskParts = [];
  for (let i = 0; i < 4; i++) {
    const bits = Math.min(8, Math.max(0, cidrNum - i * 8));
    subnetMaskParts.push(256 - Math.pow(2, 8 - bits));
  }
  const subnetMask = subnetMaskParts.join('.');

  return `! Subnetting Information
! IP Address: ${ip}
! CIDR: /${cidr}

! ============================================
! Subnetting Analysis
! ============================================
! IP Address:     ${ip}
! CIDR Prefix:    /${cidr}
! Subnet Mask:    ${subnetMask}
! Total Hosts:    ${totalHosts.toLocaleString()}
! Usable Hosts:   ${usableHosts.toLocaleString()}

! Binary breakdown:
! Network bits:   ${cidr}
! Host bits:      ${hostBits}

! Quick reference for /${cidr}:
! - Subnet mask: ${subnetMask}
! - Number of subnets: ${Math.pow(2, cidrNum % 8)}
! - Hosts per subnet: ${usableHosts}

! To apply on Cisco device:
! interface GigabitEthernet0/0
!  ip address ${ip} ${subnetMask}
!  no shutdown`;
}

interface ConfigParams {
  [key: string]: string;
}

export default function CLIGenerator() {
  const { t } = useLanguage();
  const [configType, setConfigType] = useState<ConfigType>('static');
  const [params, setParams] = useState<ConfigParams>({
    ip: '192.168.1.10',
    subnet: '255.255.255.0',
    gateway: '192.168.1.1',
    interface: 'GigabitEthernet0/0',
    pool: 'POOL1',
    network: '192.168.1.0',
    dns: '8.8.8.8',
    startIp: '192.168.1.1',
    endIp: '192.168.1.10',
    vlanId: '10',
    vlanName: 'STUDENT',
    dest: '10.0.0.0',
    nextHop: '192.168.1.1',
    interfaceIn: 'GigabitEthernet0/0',
    interfaceOut: 'GigabitEthernet0/1',
    insideNetwork: '192.168.1.0',
    insideSubnet: '0.0.0.255',
    cidr: '24',
  });
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const generateConfig = useCallback(() => {
    let config = '';
    switch (configType) {
      case 'static':
        config = generateStaticIP(params.ip, params.subnet, params.gateway, params.interface);
        break;
      case 'dhcp':
        config = generateDHCP(params.pool, params.network, params.subnet, params.gateway, params.dns, params.startIp, params.endIp);
        break;
      case 'vlan':
        config = generateVLAN(params.vlanId, params.vlanName, params.interface);
        break;
      case 'static-route':
        config = generateStaticRoute(params.dest, params.subnet, params.nextHop);
        break;
      case 'rip':
        config = generateRIP(params.network);
        break;
      case 'nat':
        config = generateNAT(params.interfaceIn, params.interfaceOut, params.insideNetwork, params.insideSubnet);
        break;
      case 'subnetting':
        config = generateSubnetting(params.ip, params.cidr);
        break;
    }
    setOutput(config);
  }, [configType, params]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadConfig = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${configType}-config.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderParams = () => {
    const inputClass = "bg-card border-border";
    
    switch (configType) {
      case 'static':
        return (
          <>
            <div><Label>IP Address</Label><Input className={inputClass} value={params.ip} onChange={e => setParams({...params, ip: e.target.value})} /></div>
            <div><Label>Subnet Mask</Label><Input className={inputClass} value={params.subnet} onChange={e => setParams({...params, subnet: e.target.value})} /></div>
            <div><Label>Gateway</Label><Input className={inputClass} value={params.gateway} onChange={e => setParams({...params, gateway: e.target.value})} /></div>
            <div><Label>Interface</Label><Input className={inputClass} value={params.interface} onChange={e => setParams({...params, interface: e.target.value})} /></div>
          </>
        );
      case 'dhcp':
        return (
          <>
            <div><Label>Pool Name</Label><Input className={inputClass} value={params.pool} onChange={e => setParams({...params, pool: e.target.value})} /></div>
            <div><Label>Network</Label><Input className={inputClass} value={params.network} onChange={e => setParams({...params, network: e.target.value})} /></div>
            <div><Label>Subnet Mask</Label><Input className={inputClass} value={params.subnet} onChange={e => setParams({...params, subnet: e.target.value})} /></div>
            <div><Label>Gateway</Label><Input className={inputClass} value={params.gateway} onChange={e => setParams({...params, gateway: e.target.value})} /></div>
            <div><Label>DNS Server</Label><Input className={inputClass} value={params.dns} onChange={e => setParams({...params, dns: e.target.value})} /></div>
            <div><Label>Excluded Start</Label><Input className={inputClass} value={params.startIp} onChange={e => setParams({...params, startIp: e.target.value})} /></div>
            <div><Label>Excluded End</Label><Input className={inputClass} value={params.endIp} onChange={e => setParams({...params, endIp: e.target.value})} /></div>
          </>
        );
      case 'vlan':
        return (
          <>
            <div><Label>VLAN ID</Label><Input className={inputClass} value={params.vlanId} onChange={e => setParams({...params, vlanId: e.target.value})} /></div>
            <div><Label>VLAN Name</Label><Input className={inputClass} value={params.vlanName} onChange={e => setParams({...params, vlanName: e.target.value})} /></div>
            <div><Label>Interface</Label><Input className={inputClass} value={params.interface} onChange={e => setParams({...params, interface: e.target.value})} /></div>
          </>
        );
      case 'static-route':
        return (
          <>
            <div><Label>Destination Network</Label><Input className={inputClass} value={params.dest} onChange={e => setParams({...params, dest: e.target.value})} /></div>
            <div><Label>Subnet Mask</Label><Input className={inputClass} value={params.subnet} onChange={e => setParams({...params, subnet: e.target.value})} /></div>
            <div><Label>Next Hop</Label><Input className={inputClass} value={params.nextHop} onChange={e => setParams({...params, nextHop: e.target.value})} /></div>
          </>
        );
      case 'rip':
        return (
          <>
            <div><Label>Network</Label><Input className={inputClass} value={params.network} onChange={e => setParams({...params, network: e.target.value})} /></div>
          </>
        );
      case 'nat':
        return (
          <>
            <div><Label>Inside Interface</Label><Input className={inputClass} value={params.interfaceIn} onChange={e => setParams({...params, interfaceIn: e.target.value})} /></div>
            <div><Label>Outside Interface</Label><Input className={inputClass} value={params.interfaceOut} onChange={e => setParams({...params, interfaceOut: e.target.value})} /></div>
            <div><Label>Inside Network</Label><Input className={inputClass} value={params.insideNetwork} onChange={e => setParams({...params, insideNetwork: e.target.value})} /></div>
            <div><Label>Inside Subnet (wildcard)</Label><Input className={inputClass} value={params.insideSubnet} onChange={e => setParams({...params, insideSubnet: e.target.value})} /></div>
          </>
        );
      case 'subnetting':
        return (
          <>
            <div><Label>IP Address</Label><Input className={inputClass} value={params.ip} onChange={e => setParams({...params, ip: e.target.value})} /></div>
            <div><Label>CIDR (/24, /16, etc)</Label><Input className={inputClass} value={params.cidr} onChange={e => setParams({...params, cidr: e.target.value})} /></div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#e6ff00]/10 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-[#e6ff00]" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">{t('cliGeneratorTitle')}</h1>
              <p className="text-sm text-muted-foreground">{t('cliGeneratorDesc')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Panel */}
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-base">{t('configType')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={configType} onValueChange={(v) => setConfigType(v as ConfigType)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {configTypes.map((ct) => (
                        <SelectItem key={ct.id} value={ct.id}>{ct.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-sm font-medium">{t('enterParams')}</h4>
                    {renderParams()}
                  </div>

                  <Button
                    onClick={generateConfig}
                    className="w-full bg-[#e6ff00] text-black hover:bg-[#d4eb00]"
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    {t('generateConfig')}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Output Panel */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="font-display text-base flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#e6ff00]" />
                    Output
                  </CardTitle>
                  {output && (
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={copyToClipboard}>
                        {copied ? <Check className="w-4 h-4 mr-1.5 text-green-500" /> : <Copy className="w-4 h-4 mr-1.5" />}
                        {copied ? 'Copied' : t('copyConfig')}
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadConfig}>
                        <Download className="w-4 h-4 mr-1.5" />
                        {t('downloadConfig')}
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {output ? (
                    <pre className="bg-black rounded-lg p-4 overflow-x-auto text-sm terminal-text text-green-400">
                      <code>{output}</code>
                    </pre>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                      <Terminal className="w-12 h-12 mb-4 opacity-30" />
                      <p className="text-sm">Pilih jenis konfigurasi dan klik Generate</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
