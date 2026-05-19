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
import { Calculator, Copy, Check } from 'lucide-react';

interface SubnetResult {
  networkAddress: string;
  broadcastAddress: string;
  subnetMask: string;
  wildcardMask: string;
  totalHosts: number;
  usableHosts: number;
  hostRange: string;
  binaryNetwork: string;
  binaryMask: string;
}

function ipToLong(ip: string): number {
  const parts = ip.split('.').map(Number);
  return (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
}

function longToIp(long: number): string {
  return [
    (long >>> 24) & 0xff,
    (long >>> 16) & 0xff,
    (long >>> 8) & 0xff,
    long & 0xff,
  ].join('.');
}

function calculateSubnet(ip: string, cidr: number): SubnetResult | null {
  try {
    const ipLong = ipToLong(ip);
    const mask = 0xffffffff << (32 - cidr);
    const networkLong = ipLong & mask;
    const broadcastLong = networkLong | (~mask >>> 0);
    const totalHosts = Math.pow(2, 32 - cidr);
    const usableHosts = totalHosts > 2 ? totalHosts - 2 : 0;

    const maskParts = [
      (mask >>> 24) & 0xff,
      (mask >>> 16) & 0xff,
      (mask >>> 8) & 0xff,
      mask & 0xff,
    ];
    const subnetMask = maskParts.join('.');

    const wildcardParts = [
      255 - maskParts[0],
      255 - maskParts[1],
      255 - maskParts[2],
      255 - maskParts[3],
    ];
    const wildcardMask = wildcardParts.join('.');

    const firstUsable = usableHosts > 0 ? networkLong + 1 : networkLong;
    const lastUsable = usableHosts > 0 ? broadcastLong - 1 : broadcastLong;

    return {
      networkAddress: longToIp(networkLong),
      broadcastAddress: longToIp(broadcastLong),
      subnetMask,
      wildcardMask,
      totalHosts,
      usableHosts,
      hostRange: usableHosts > 0 ? `${longToIp(firstUsable)} - ${longToIp(lastUsable)}` : 'N/A',
      binaryNetwork: networkLong.toString(2).padStart(32, '0').match(/.{8}/g)?.join('.') || '',
      binaryMask: mask.toString(2).padStart(32, '0').match(/.{8}/g)?.join('.') || '',
    };
  } catch {
    return null;
  }
}

const cidrOptions = Array.from({ length: 31 }, (_, i) => i + 1).filter(c => c >= 8);

export default function SubnetCalculator() {
  const { t } = useLanguage();
  const [ip, setIp] = useState('192.168.1.100');
  const [cidr, setCidr] = useState('24');
  const [result, setResult] = useState<SubnetResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCalculate = useCallback(() => {
    const res = calculateSubnet(ip, parseInt(cidr));
    setResult(res);
  }, [ip, cidr]);

  const copyResult = useCallback(() => {
    if (!result) return;
    const text = `Network: ${result.networkAddress}\nBroadcast: ${result.broadcastAddress}\nSubnet Mask: ${result.subnetMask}\nUsable Hosts: ${result.usableHosts}\nRange: ${result.hostRange}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [result]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#e6ff00]/10 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-[#e6ff00]" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">{t('subnetCalculator')}</h1>
              <p className="text-sm text-muted-foreground">Kalkulator subnet interaktif untuk pembelajaran</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Input Panel */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="font-display text-base">Input</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="ip">{t('ipAddress')}</Label>
                  <Input
                    id="ip"
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                    placeholder="192.168.1.100"
                    className="font-mono"
                  />
                </div>
                <div>
                  <Label htmlFor="cidr">{t('cidr')} Prefix</Label>
                  <Select value={cidr} onValueChange={setCidr}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cidrOptions.map((c) => (
                        <SelectItem key={c} value={c.toString()}>
                          /{c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleCalculate}
                  className="w-full bg-[#e6ff00] text-black hover:bg-[#d4eb00]"
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  {t('calculate')}
                </Button>

                {/* Quick CIDR reference */}
                <div className="pt-4 border-t border-border">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Referensi CIDR Cepat</p>
                  <div className="grid grid-cols-2 gap-1">
                    {[
                      ['/8', '255.0.0.0', '16.7M hosts'],
                      ['/16', '255.255.0.0', '65.5K hosts'],
                      ['/24', '255.255.255.0', '254 hosts'],
                      ['/30', '255.255.255.252', '2 hosts'],
                    ].map(([cidrVal, mask, hosts]) => (
                      <button
                        key={cidrVal}
                        onClick={() => setCidr(cidrVal.replace('/', ''))}
                        className="text-left px-2 py-1 rounded text-xs font-mono text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                      >
                        {cidrVal} = {mask}
                        <span className="text-muted-foreground/60 ml-1">({hosts})</span>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <div className="lg:col-span-3">
              {result ? (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-display text-base">Hasil Perhitungan</CardTitle>
                    <Button variant="outline" size="sm" onClick={copyResult}>
                      {copied ? <Check className="w-4 h-4 mr-1.5 text-green-500" /> : <Copy className="w-4 h-4 mr-1.5" />}
                      {copied ? 'Copied' : 'Copy'}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Main results */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <ResultCard label={t('networkAddress')} value={result.networkAddress} highlight />
                      <ResultCard label={t('broadcastAddress')} value={result.broadcastAddress} />
                      <ResultCard label={t('subnetMask')} value={result.subnetMask} />
                      <ResultCard label="Wildcard Mask" value={result.wildcardMask} />
                      <ResultCard label={t('usableHosts')} value={result.usableHosts.toLocaleString()} highlight />
                      <ResultCard label={t('hostRange')} value={result.hostRange} />
                      <ResultCard label="Total Hosts" value={result.totalHosts.toLocaleString()} />
                      <ResultCard label="IP Class" value={getIpClass(ip)} />
                    </div>

                    {/* Binary breakdown */}
                    <div className="pt-4 border-t border-border">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Representasi Biner</p>
                      <div className="space-y-1 font-mono text-xs bg-black/50 rounded-lg p-3">
                        <p className="text-green-400">Network: {result.binaryNetwork}</p>
                        <p className="text-blue-400">Mask:   {result.binaryMask}</p>
                      </div>
                    </div>

                    {/* Educational note */}
                    <div className="p-4 rounded-lg bg-[#e6ff00]/5 border border-[#e6ff00]/20">
                      <p className="text-sm text-foreground">
                        <strong className="text-[#e6ff00]">Tips:</strong>{' '}
                        Dengan /{cidr}, {result.usableHosts.toLocaleString()} host dapat terhubung ke jaringan ini.
                        Gunakan IP pertama ({result.networkAddress}) untuk network address dan
                        IP terakhir ({result.broadcastAddress}) untuk broadcast.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-full flex items-center justify-center">
                  <CardContent className="text-center py-16">
                    <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
                    <p className="text-muted-foreground">Masukkan IP dan CIDR untuk menghitung</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ResultCard({ label, value, highlight }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className={`p-3 rounded-lg border ${highlight ? 'border-[#e6ff00]/30 bg-[#e6ff00]/5' : 'border-border bg-card/50'}`}>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className={`font-mono text-sm font-semibold ${highlight ? 'text-[#e6ff00]' : 'text-foreground'}`}>
        {value}
      </p>
    </div>
  );
}

function getIpClass(ip: string): string {
  const first = parseInt(ip.split('.')[0]);
  if (first >= 1 && first <= 126) return 'A';
  if (first >= 128 && first <= 191) return 'B';
  if (first >= 192 && first <= 223) return 'C';
  if (first >= 224 && first <= 239) return 'D (Multicast)';
  return 'E (Reserved)';
}
