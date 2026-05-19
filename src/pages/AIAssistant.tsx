import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, User, Loader2, Lightbulb, Network, Terminal, AlertCircle, BookOpen } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const mockResponses: Record<string, string> = {
  default: `Saya adalah asisten AI TJKT Labs yang dapat membantu Anda dengan:

- Penjelasan konsep jaringan komputer
- Panduan konfigurasi CLI Cisco
- Troubleshooting masalah jaringan
- Pembuatan kuis dan latihan
- Pertanyaan seputar sertifikasi Cisco

Silakan ajukan pertanyaan Anda!`,

  subnetting: `**Subnetting** adalah teknik membagi satu jaringan besar menjadi beberapa sub-jaringan yang lebih kecil.

**Konsep Dasar:**
- IP Address terdiri dari Network ID dan Host ID
- Subnet Mask menentukan berapa bit untuk network dan host
- CIDR (Classless Inter-Domain Routing) menggunakan notasi /n

**Contoh Perhitungan /24:**
- IP: 192.168.1.0/24
- Subnet Mask: 255.255.255.0
- Network Address: 192.168.1.0
- Broadcast: 192.168.1.255
- Usable Hosts: 254 (192.168.1.1 - 192.168.1.254)

**Tips:** Gunakan Kalkulator Subnet di menu untuk perhitungan otomatis!`,

  vlan: `**VLAN (Virtual Local Area Network)** memungkinkan Anda membuat beberapa jaringan logis dalam satu switch fisik.

**Manfaat VLAN:**
1. **Segmentasi** - Memisahkan lalu lintas jaringan
2. **Keamanan** - Mengisolasi grup pengguna
3. **Efisiensi** - Mengurangi broadcast domain
4. **Fleksibilitas** - Pengaturan berbasis port

**Konfigurasi Dasar Cisco:**
\`\`\`
enable
configure terminal
vlan 10
 name STUDENT
vlan 20
 name TEACHER
exit

interface GigabitEthernet0/1
 switchport mode access
 switchport access vlan 10
\`\`\`

**Verifikasi:**
\`\`\`
show vlan brief
show vlan id 10
\`\`\``, 

  router: `**Router** adalah perangkat Layer 3 yang menghubungkan jaringan yang berbeda dan mem-forward paket berdasarkan IP address.

**Fungsi Utama:**
- Routing paket antar jaringan
- NAT (Network Address Translation)
- DHCP Server
- Access Control Lists (ACL)

**Konfigurasi Dasar:**
\`\`\`
enable
configure terminal
hostname Router-01

interface GigabitEthernet0/0
 ip address 192.168.1.1 255.255.255.0
 no shutdown
 description LAN-Student

interface GigabitEthernet0/1
 ip address 10.0.0.1 255.255.255.252
 no shutdown
 description WAN-Link
\`\`\`

**Perintah Verifikasi:**
- \`show ip route\` - Tabel routing
- \`show ip interface brief\` - Status interface
- \`show running-config\` - Konfigurasi aktif`,

  dhcp: `**DHCP (Dynamic Host Configuration Protocol)** secara otomatis memberikan konfigurasi IP kepada perangkat yang terhubung.

**Konfigurasi DHCP Server pada Cisco:**
\`\`\`
enable
configure terminal

ip dhcp pool STUDENT-POOL
 network 192.168.1.0 255.255.255.0
 default-router 192.168.1.1
 dns-server 8.8.8.8 8.8.4.4
 domain-name tjkt.labs
 lease 8

ip dhcp excluded-address 192.168.1.1 192.168.1.10
ip dhcp excluded-address 192.168.1.254
\`\`\`

**Verifikasi:**
- \`show ip dhcp pool\`
- \`show ip dhcp binding\`
- \`show ip dhcp server statistics\`

**Troubleshooting:**
Jika client tidak mendapat IP:
1. Pastikan interface DHCP pool ada dan aktif
2. Periksa excluded-address
3. Verifikasi koneksi fisik`,

  troubleshooting: `**Metode Troubleshooting Jaringan:**

**1. Physical Layer**
- Periksa kabel dan LED indicator
- Verifikasi interface: \`show ip interface brief\`

**2. Data Link Layer**
- Cek status port: \`show interfaces\`
- Verifikasi VLAN: \`show vlan brief\`

**3. Network Layer**
- Ping test ke gateway
- Cek routing table: \`show ip route\`
- Traceroute untuk melacak jalur

**4. Command Penting:**
\`\`\`
! Status interface
show ip interface brief

! Tabel routing
show ip route

! MAC address table
show mac address-table

! ARP table
show ip arp

! Log sistem
show logging
\`\`\`

**Tips:** Kerjakan dari Layer 1 ke Layer 7 secara berurutan (Bottom-Up Approach).`,

  ospf: `**OSPF (Open Shortest Path First)** adalah protokol routing link-state yang menggunakan algoritma Dijkstra untuk menentukan jalur terbaik.

**Konfigurasi Dasar:**
\`\`\`
enable
configure terminal

router ospf 1
 network 192.168.1.0 0.0.0.255 area 0
 network 10.0.0.0 0.0.0.3 area 0
 passive-interface GigabitEthernet0/0

! Interface cost (opsional)
interface GigabitEthernet0/1
 ip ospf cost 10
\`\`\`

**Verifikasi:**
\`\`\`
show ip ospf neighbor
show ip ospf database
show ip route ospf
show ip protocols
\`\`\`

**Perbedaan OSPF vs RIP:**
| Fitur | OSPF | RIP |
|-------|------|-----|
| Type | Link-state | Distance-vector |
| Metric | Cost (bandwidth) | Hop count |
| Convergence | Cepat | Lambat |
| Scalability | Baik | Terbatas |`,

  acl: `**ACL (Access Control List)** adalah daftar aturan yang mengontrol lalu lintas jaringan.

**Tipe ACL:**
- **Standard** (1-99, 1300-1999) - Filter berdasarkan source IP
- **Extended** (100-199, 2000-2699) - Filter berdasarkan source, dest, port, protocol

**Konfigurasi Standard ACL:**
\`\`\`
! Blokir IP spesifik
access-list 10 deny 192.168.1.50
access-list 10 permit any

! Terapkan ke interface
interface GigabitEthernet0/0
 ip access-group 10 in
\`\`\`

**Konfigurasi Extended ACL:**
\`\`\`
! Blokir HTTP dari subnet ke server
access-list 101 deny tcp 192.168.1.0 0.0.0.255 host 10.0.0.10 eq 80
access-list 101 permit ip any any

interface GigabitEthernet0/0
 ip access-group 101 in
\`\`\`

**Named ACL (Cisco IOS 11.2+):**
\`\`\`
ip access-list extended BLOCK-HTTP
 deny tcp any any eq 80
 deny tcp any any eq 443
 permit ip any any
\`\`\``, 
};

const suggestedQuestions = [
  { text: 'Jelaskan tentang subnetting', icon: Network, key: 'subnetting' },
  { text: 'Bagaimana cara konfigurasi VLAN?', icon: Terminal, key: 'vlan' },
  { text: 'Fungsi utama router apa?', icon: Network, key: 'router' },
  { text: 'Cara setup DHCP server?', icon: Terminal, key: 'dhcp' },
  { text: 'Tips troubleshooting jaringan', icon: AlertCircle, key: 'troubleshooting' },
  { text: 'Konfigurasi OSPF routing', icon: BookOpen, key: 'ospf' },
];

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  
  if (lower.includes('subnet') || lower.includes('cidr') || lower.includes('/24') || lower.includes('/16'))
    return mockResponses.subnetting;
  if (lower.includes('vlan')) return mockResponses.vlan;
  if (lower.includes('router') && !lower.includes('routing')) return mockResponses.router;
  if (lower.includes('dhcp')) return mockResponses.dhcp;
  if (lower.includes('troubleshoot') || lower.includes('error') || lower.includes('problem'))
    return mockResponses.troubleshooting;
  if (lower.includes('ospf')) return mockResponses.ospf;
  if (lower.includes('acl') || lower.includes('access list') || lower.includes('firewall'))
    return mockResponses.acl;
  if (lower.includes('static route') || lower.includes('routing statis'))
    return mockResponses.router;
  if (lower.includes('rip')) return mockResponses.ospf.replace('OSPF', 'RIP').replace('ospf', 'rip');
  
  return `Terima kasih atas pertanyaan Anda tentang **"${input}"**!

Saya adalah asisten AI TJKT Labs yang dirancang untuk membantu pembelajaran jaringan komputer. Meskipun saya belum memiliki jawaban spesifik untuk pertanyaan ini, berikut adalah beberapa topik yang bisa saya bantu:

- **Konfigurasi Cisco IOS** (Router, Switch, VLAN, ACL)
- **Protokol Routing** (Static, RIP, OSPF, EIGRP)
- **Subnetting dan IP Addressing**
- **Troubleshooting Jaringan**
- **DHCP, DNS, dan NAT**
- **Network Security**

Silakan ajukan pertanyaan yang lebih spesifik atau pilih dari daftar pertanyaan yang disarankan!`;
}

export default function AIAssistant() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: mockResponses.default,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Simulate AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 700));

    const response = getAIResponse(text);
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      // Code blocks
      if (line.startsWith('```')) {
        return <div key={i} className="my-2" />;
      }
      // Code lines
      if (line.startsWith('! ') || line.startsWith('  ') || line.includes(' show ')) {
        return (
          <div key={i} className="font-mono text-xs bg-black/50 rounded px-2 py-0.5 my-0.5 text-green-400">
            {line}
          </div>
        );
      }
      // Headers
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <h4 key={i} className="font-semibold text-foreground mt-3 mb-1">
            {line.replace(/\*\*/g, '')}
          </h4>
        );
      }
      // Bullet points
      if (line.match(/^\d+\.\s/)) {
        return (
          <li key={i} className="ml-4 text-sm text-muted-foreground">
            {line.replace(/^\d+\.\s/, '')}
          </li>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <li key={i} className="ml-4 text-sm text-muted-foreground">
            {line.substring(2)}
          </li>
        );
      }
      if (line.startsWith('|')) {
        return (
          <div key={i} className="font-mono text-xs text-muted-foreground">
            {line}
          </div>
        );
      }
      if (line.trim() === '') {
        return <div key={i} className="h-1" />;
      }
      return (
        <p key={i} className="text-sm text-muted-foreground leading-relaxed">
          {line.replace(/\*\*(.*?)\*\*/g, (_, p1) => p1).replace(/`(.*?)`/g, (_, p1) => p1)}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 h-screen flex flex-col max-w-4xl mx-auto">
        {/* Chat area */}
        <ScrollArea className="flex-1 px-4" ref={scrollRef}>
          <div className="py-6 space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'assistant'
                      ? 'bg-[#e6ff00]/10'
                      : 'bg-accent'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <Bot className="w-4 h-4 text-[#e6ff00]" />
                  ) : (
                    <User className="w-4 h-4 text-foreground" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-[#e6ff00] text-black'
                      : 'bg-card border border-border'
                  }`}
                >
                  {msg.role === 'assistant' ? renderContent(msg.content) : (
                    <p className="text-sm">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#e6ff00]/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#e6ff00]" />
                </div>
                <div className="bg-card border border-border rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">{t('thinking')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input area */}
        <div className="border-t border-border bg-card p-4">
          {/* Suggested questions */}
          {messages.length <= 1 && (
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                <Lightbulb className="w-3 h-3" />
                {t('suggestedQuestions')}
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q.key}
                    onClick={() => sendMessage(q.text)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent text-xs text-muted-foreground hover:text-foreground hover:bg-[#e6ff00]/10 hover:border-[#e6ff00]/30 border border-border transition-all"
                  >
                    <q.icon className="w-3 h-3" />
                    {q.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('askAnything')}
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-[#e6ff00] text-black hover:bg-[#d4eb00]"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
