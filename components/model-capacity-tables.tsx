"use client";



const imageFixedModels = [
  { name: "Flux Schnell", credit: "0.3", free: "500", starter: "5,000", pro: "10,000", team: "13,333" },
  { name: "Bria Background Remove", credit: "2", free: "75", starter: "750", pro: "1,500", team: "2,000" },
  { name: "Recraft V3", credit: "4", free: "37", starter: "375", pro: "750", team: "1,000" },
  { name: "Flux 2 Pro", credit: "3", free: "50", starter: "500", pro: "1,000", team: "1,333" },
  { name: "Ideogram V3 (Turbo)", credit: "3", free: "50", starter: "500", pro: "1,000", team: "1,333" },
  { name: "Kling Image V3", credit: "3", free: "50", starter: "500", pro: "1,000", team: "1,333" },
  { name: "Imagen 4 Fast", credit: "4", free: "37", starter: "375", pro: "750", team: "1,000" },
  { name: "Seedream V4.5", credit: "4", free: "37", starter: "375", pro: "750", team: "1,000" },
  { name: "Imagen 4 Standard", credit: "5", free: "30", starter: "300", pro: "600", team: "800" },
  { name: "Ideogram V3 (Balanced)", credit: "6", free: "25", starter: "250", pro: "500", team: "666" },
  { name: "Imagen 4 Ultra", credit: "6", free: "25", starter: "250", pro: "500", team: "666" },
  { name: "Topaz Image Upscale", credit: "8", free: "18", starter: "187", pro: "375", team: "500" },
  { name: "Ideogram V3 (Quality)", credit: "9", free: "16", starter: "166", pro: "333", team: "444" },
];

const imageDynamicModels = [
  { name: "Nano Banana 2", config: "0.5K (512px)", credit: "6", free: "25", starter: "250", pro: "500", team: "666" },
  { name: "Nano Banana Pro", config: "1K", credit: "15", free: "10", starter: "100", pro: "200", team: "266" },
];

const videoFixedModels = [
  { name: "Wan Effects", credit: "35", free: "4", starter: "42", pro: "85", team: "114" },
];

const videoDynamicModels = [
  { name: "Grok Imagine Video", config: "480p, 10s", credit: "100", free: "1", starter: "15", pro: "30", team: "40" },
  { name: "Kling V2.6 Pro", config: "10s, no audio", credit: "140", free: "1", starter: "10", pro: "21", team: "28" },
  { name: "Veo 3.1 (Text, Fast)", config: "720p, 8s, no audio", credit: "160", free: "0", starter: "9", pro: "18", team: "25" },
  { name: "Veo 3.1 (Text, Standard)", config: "720p, 8s, no audio", credit: "320", free: "0", starter: "4", pro: "9", team: "12" },
  { name: "Kling Motion Control", config: "Standard tier, 10s", credit: "140", free: "1", starter: "10", pro: "21", team: "28" },
  { name: "Kling O3 V2V Edit", config: "Standard tier, 10s", credit: "504", free: "0", starter: "2", pro: "5", team: "7" },
  { name: "Topaz Video Upscale", config: "Per second pricing", credit: "1,501", free: "0", starter: "0", pro: "1", team: "2" },
  { name: "Veo 3.1 (Image, no audio)", config: "720p/1080p, 8s, no audio", credit: "160", free: "0", starter: "9", pro: "18", team: "25" },
  { name: "Veo 3.1 (Image, with audio)", config: "720p/1080p, 8s, with audio", credit: "320", free: "0", starter: "4", pro: "9", team: "12" },
  { name: "Sora 2 Pro", config: "720p, 4s", credit: "120", free: "1", starter: "12", pro: "25", team: "33" },
  { name: "PixVerse V5", config: "540p, 5s", credit: "15", free: "10", starter: "100", pro: "200", team: "266" },
  { name: "Luma Ray 2", config: "540p, 5s", credit: "50", free: "3", starter: "30", pro: "60", team: "80" },
  { name: "Luma Ray 2 Flash", config: "540p, 5s", credit: "20", free: "7", starter: "75", pro: "150", team: "200" },
];

const audioModels = [
  { name: "ElevenLabs TTS (V3)", credit: "10", free: "15K chars", starter: "150K chars", pro: "300K chars", team: "400K chars" },
];

const textModels = [
  { name: "Claude Sonnet 4.6", credit: "1", free: "150K tokens", starter: "1.5M tokens", pro: "3M tokens", team: "4M tokens" },
  { name: "Claude Opus 4.6", credit: "4", free: "37K tokens", starter: "375K tokens", pro: "750K tokens", team: "1M tokens" },
  { name: "GPT-5.2", credit: "2", free: "75K tokens", starter: "750K tokens", pro: "1.5M tokens", team: "2M tokens" },
  { name: "Gemini 3.1 Pro", credit: "1", free: "150K tokens", starter: "1.5M tokens", pro: "3M tokens", team: "4M tokens" },
  { name: "Gemini 2.5 Flash", credit: "0.1", free: "1.5M tokens", starter: "15M tokens", pro: "30M tokens", team: "40M tokens" },
];


function TableHeader({ align = "center", children, className = "" }: { align?: "left" | "center" | "right", children: React.ReactNode, className?: string }) {
  const alignmentClass = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";
  return (
    <th className={`px-4 py-3 text-[13px] font-medium text-muted-foreground uppercase tracking-wider border-b border-border/50 ${alignmentClass} ${className}`}>
      {children}
    </th>
  );
}

function TableCell({ align = "center", children, className = "" }: { align?: "left" | "center" | "right", children: React.ReactNode, className?: string }) {
  const alignmentClass = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";
  return (
    <td className={`px-4 py-4 text-[14px] text-foreground/90 border-b border-border/50 ${alignmentClass} ${className}`}>
      {children}
    </td>
  );
}

export function ModelCapacityTables() {
  return (
    <div className="space-y-16">
      
      {/* Images Section */}
      <div>
        <h3 className="text-2xl font-medium tracking-tight mb-6">Image Generation Capacity</h3>
        
        <div className="mb-8">
          <h4 className="text-[17px] font-medium mb-4 text-foreground/80">Fixed Credit Models</h4>
          <div className="overflow-x-auto rounded-xl border border-border/50 bg-secondary/20">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="bg-secondary/50">
                  <TableHeader align="left" className="w-[200px]">Model</TableHeader>
                  <TableHeader align="left">Credits/Image</TableHeader>
                  <TableHeader>Free (150)</TableHeader>
                  <TableHeader>Starter (1,500)</TableHeader>
                  <TableHeader>Pro (3,000)</TableHeader>
                  <TableHeader>Team (4,000)</TableHeader>
                </tr>
              </thead>
              <tbody>
                {imageFixedModels.map((item) => (
                  <tr key={item.name} className="hover:bg-secondary/40 transition-colors">
                    <TableCell align="left" className="font-medium text-foreground">{item.name}</TableCell>
                    <TableCell align="left" className="text-muted-foreground tabular-nums">{item.credit}</TableCell>
                    <TableCell className="tabular-nums">{item.free}</TableCell>
                    <TableCell className="tabular-nums">{item.starter}</TableCell>
                    <TableCell className="tabular-nums">{item.pro}</TableCell>
                    <TableCell className="tabular-nums">{item.team}</TableCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 className="text-[17px] font-medium mb-4 text-foreground/80">Dynamic Pricing Models <span className="text-sm font-normal text-muted-foreground ml-2">(Lowest Cost Options)</span></h4>
          <div className="overflow-x-auto rounded-xl border border-border/50 bg-secondary/20">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="bg-secondary/50">
                  <TableHeader align="left" className="w-[180px]">Model</TableHeader>
                  <TableHeader align="left">Lowest Cost Config</TableHeader>
                  <TableHeader align="center">Credits/Image</TableHeader>
                  <TableHeader>Free (150)</TableHeader>
                  <TableHeader>Starter (1,500)</TableHeader>
                  <TableHeader>Pro (3,000)</TableHeader>
                  <TableHeader>Team (4,000)</TableHeader>
                </tr>
              </thead>
              <tbody>
                {imageDynamicModels.map((item) => (
                  <tr key={item.name} className="hover:bg-secondary/40 transition-colors">
                    <TableCell align="left" className="font-medium text-foreground">{item.name}</TableCell>
                    <TableCell align="left" className="text-muted-foreground">{item.config}</TableCell>
                    <TableCell className="text-muted-foreground tabular-nums">{item.credit}</TableCell>
                    <TableCell className="tabular-nums">{item.free}</TableCell>
                    <TableCell className="tabular-nums">{item.starter}</TableCell>
                    <TableCell className="tabular-nums">{item.pro}</TableCell>
                    <TableCell className="tabular-nums">{item.team}</TableCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Videos Section */}
      <div>
        <h3 className="text-2xl font-medium tracking-tight mb-6">Video Generation Capacity <span className="text-lg font-normal text-muted-foreground ml-2">(10-second videos)</span></h3>
        
        <div className="mb-8">
          <h4 className="text-[17px] font-medium mb-4 text-foreground/80">Fixed Credit Models</h4>
          <div className="overflow-x-auto rounded-xl border border-border/50 bg-secondary/20">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="bg-secondary/50">
                  <TableHeader align="left" className="w-[200px]">Model</TableHeader>
                  <TableHeader align="left">Credits/10s Video</TableHeader>
                  <TableHeader>Free (150)</TableHeader>
                  <TableHeader>Starter (1,500)</TableHeader>
                  <TableHeader>Pro (3,000)</TableHeader>
                  <TableHeader>Team (4,000)</TableHeader>
                </tr>
              </thead>
              <tbody>
                {videoFixedModels.map((item) => (
                  <tr key={item.name} className="hover:bg-secondary/40 transition-colors">
                    <TableCell align="left" className="font-medium text-foreground">{item.name}</TableCell>
                    <TableCell align="left" className="text-muted-foreground tabular-nums">{item.credit}</TableCell>
                    <TableCell className="tabular-nums">{item.free}</TableCell>
                    <TableCell className="tabular-nums">{item.starter}</TableCell>
                    <TableCell className="tabular-nums">{item.pro}</TableCell>
                    <TableCell className="tabular-nums">{item.team}</TableCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 className="text-[17px] font-medium mb-4 text-foreground/80">Dynamic Pricing Models <span className="text-sm font-normal text-muted-foreground ml-2">(Lowest Cost Options)</span></h4>
          <div className="overflow-x-auto rounded-xl border border-border/50 bg-secondary/20">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="bg-secondary/50">
                  <TableHeader align="left" className="w-[180px]">Model</TableHeader>
                  <TableHeader align="left">Lowest Cost Config</TableHeader>
                  <TableHeader align="center">Credits/10s</TableHeader>
                  <TableHeader>Free (150)</TableHeader>
                  <TableHeader>Starter (1,500)</TableHeader>
                  <TableHeader>Pro (3,000)</TableHeader>
                  <TableHeader>Team (4,000)</TableHeader>
                </tr>
              </thead>
              <tbody>
                {videoDynamicModels.map((item) => (
                  <tr key={item.name} className="hover:bg-secondary/40 transition-colors">
                    <TableCell align="left" className="font-medium text-foreground">{item.name}</TableCell>
                    <TableCell align="left" className="text-muted-foreground">{item.config}</TableCell>
                    <TableCell className="text-muted-foreground tabular-nums">{item.credit}</TableCell>
                    <TableCell className="tabular-nums">{item.free}</TableCell>
                    <TableCell className="tabular-nums">{item.starter}</TableCell>
                    <TableCell className="tabular-nums">{item.pro}</TableCell>
                    <TableCell className="tabular-nums">{item.team}</TableCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* Audio Section */}
      <div>
        <h3 className="text-2xl font-medium tracking-tight mb-6">Audio/TTS Capacity</h3>
        <div className="overflow-x-auto rounded-xl border border-border/50 bg-secondary/20">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="bg-secondary/50">
                <TableHeader align="left" className="w-[200px]">Model</TableHeader>
                <TableHeader align="left">Credits/1000 chars</TableHeader>
                <TableHeader>Free (150)</TableHeader>
                <TableHeader>Starter (1,500)</TableHeader>
                <TableHeader>Pro (3,000)</TableHeader>
                <TableHeader>Team (4,000)</TableHeader>
              </tr>
            </thead>
            <tbody>
              {audioModels.map((item) => (
                <tr key={item.name} className="hover:bg-secondary/40 transition-colors">
                  <TableCell align="left" className="font-medium text-foreground">{item.name}</TableCell>
                  <TableCell align="left" className="text-muted-foreground tabular-nums">{item.credit}</TableCell>
                  <TableCell className="tabular-nums">{item.free}</TableCell>
                  <TableCell className="tabular-nums">{item.starter}</TableCell>
                  <TableCell className="tabular-nums">{item.pro}</TableCell>
                  <TableCell className="tabular-nums">{item.team}</TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Text Section */}
      <div>
        <h3 className="text-2xl font-medium tracking-tight mb-6">Text/LLM Assistant Capacity</h3>
        <div className="overflow-x-auto rounded-xl border border-border/50 bg-secondary/20">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="bg-secondary/50">
                <TableHeader align="left" className="w-[200px]">Model</TableHeader>
                <TableHeader align="left">Credits/1000 tokens</TableHeader>
                <TableHeader>Free (150)</TableHeader>
                <TableHeader>Starter (1,500)</TableHeader>
                <TableHeader>Pro (3,000)</TableHeader>
                <TableHeader>Team (4,000)</TableHeader>
              </tr>
            </thead>
            <tbody>
              {textModels.map((item) => (
                <tr key={item.name} className="hover:bg-secondary/40 transition-colors">
                  <TableCell align="left" className="font-medium text-foreground">{item.name}</TableCell>
                  <TableCell align="left" className="text-muted-foreground tabular-nums">{item.credit}</TableCell>
                  <TableCell className="tabular-nums">{item.free}</TableCell>
                  <TableCell className="tabular-nums">{item.starter}</TableCell>
                  <TableCell className="tabular-nums">{item.pro}</TableCell>
                  <TableCell className="tabular-nums">{item.team}</TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
