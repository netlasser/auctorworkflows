import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Clock,
  DollarSign,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Calculator,
  CalendarCheck,
  CheckCircle2,
  Sliders,
  Briefcase,
  Layers,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { CAL_LINK } from "@/lib/site";
import Reveal from "./Reveal";

type IndustryPreset = {
  label: string;
  leads: number;
  rate: number;
  deal: number;
  closeRate: number;
};

const PRESETS: IndustryPreset[] = [
  {
    label: "B2B Agency / Service",
    leads: 600,
    rate: 45,
    deal: 3500,
    closeRate: 20,
  },
  {
    label: "B2B SaaS / Tech",
    leads: 1200,
    rate: 55,
    deal: 4500,
    closeRate: 18,
  },
  {
    label: "High-Ticket Consulting",
    leads: 300,
    rate: 75,
    deal: 8000,
    closeRate: 25,
  },
];

const RoiCalculator = () => {
  const [leadsPerMonth, setLeadsPerMonth] = useState<number>(600);
  const [hourlyRate, setHourlyRate] = useState<number>(45);
  const [dealValue, setDealValue] = useState<number>(3500);
  const [closeRate, setCloseRate] = useState<number>(20);
  const [activeTab, setActiveTab] = useState<"growth" | "comparison">("growth");

  const applyPreset = (preset: IndustryPreset) => {
    setLeadsPerMonth(preset.leads);
    setHourlyRate(preset.rate);
    setDealValue(preset.deal);
    setCloseRate(preset.closeRate);
  };

  // Calculations
  const metrics = useMemo(() => {
    // Manual baseline
    // 11 minutes per lead across scraping, verifying, drafting, CRM entry & follow-up
    const manualMinutesPerLead = 11;
    const manualHours = Math.round((leadsPerMonth * manualMinutesPerLead) / 60);
    const manualLaborCost = Math.round(manualHours * hourlyRate);
    
    // Inconsistent manual follow-up & slow lead response -> ~1.2% booking rate
    const manualBookingRate = 0.012;
    const manualMeetings = Math.max(1, Math.round(leadsPerMonth * manualBookingRate));
    const manualDeals = (manualMeetings * (closeRate / 100));
    const manualRevenue = Math.round(manualDeals * dealValue);

    // Automated Workflow baseline (Our Stack)
    // Automated human time: ~45 mins/week reviewing hot calls = ~3 hrs/month
    const automatedHours = 3;
    const hoursSaved = Math.max(0, manualHours - automatedHours);
    const workdaysSaved = Math.round((hoursSaved / 8) * 10) / 10;

    // Retainer ($800/mo full stack) + tool costs (Apollo/n8n/GPT-4 ~ $150/mo) = $950/mo
    const automatedOperatingCost = 950;
    const monthlyLaborSavings = Math.max(0, manualLaborCost - automatedOperatingCost);

    // Speed to lead (<5s response), multi-variant GPT-4 hooks & warming -> ~3.8% booking rate
    const automatedBookingRate = 0.038;
    const automatedMeetings = Math.max(2, Math.round(leadsPerMonth * automatedBookingRate));
    const extraMeetings = Math.max(0, automatedMeetings - manualMeetings);
    const automatedDeals = (automatedMeetings * (closeRate / 100));
    const automatedRevenue = Math.round(automatedDeals * dealValue);
    const additionalRevenue = Math.max(0, automatedRevenue - manualRevenue);

    const totalMonthlyGain = monthlyLaborSavings + additionalRevenue;
    const annualValue = totalMonthlyGain * 12;
    const monthlyRoiPercentage = Math.round((totalMonthlyGain / automatedOperatingCost) * 100);

    return {
      manualHours,
      manualLaborCost,
      manualMeetings,
      manualRevenue,
      automatedHours,
      hoursSaved,
      workdaysSaved,
      automatedOperatingCost,
      monthlyLaborSavings,
      automatedMeetings,
      extraMeetings,
      automatedRevenue,
      additionalRevenue,
      totalMonthlyGain,
      annualValue,
      monthlyRoiPercentage,
    };
  }, [leadsPerMonth, hourlyRate, dealValue, closeRate]);

  // 6-Month cumulative projection data for Recharts AreaChart
  const cumulativeData = useMemo(() => {
    const data = [];
    let cumManualNet = 0;
    let cumAutoNet = 0;

    for (let month = 1; month <= 6; month++) {
      // Month 1 includes one-time deployment setup amortized
      const monthlyAutoNet = metrics.automatedRevenue - metrics.automatedOperatingCost;
      const monthlyManualNet = metrics.manualRevenue - metrics.manualLaborCost;

      cumManualNet += monthlyManualNet;
      cumAutoNet += monthlyAutoNet;

      data.push({
        month: `Month ${month}`,
        "Automated System": Math.round(cumAutoNet),
        "Manual Process": Math.round(cumManualNet),
        "Net Advantage": Math.round(cumAutoNet - cumManualNet),
      });
    }
    return data;
  }, [metrics]);

  // Comparison metrics for BarChart
  const comparisonData = useMemo(() => {
    return [
      {
        metric: "Time Spent (Hrs)",
        Manual: metrics.manualHours,
        Automated: metrics.automatedHours,
      },
      {
        metric: "Cost / Month ($)",
        Manual: metrics.manualLaborCost,
        Automated: metrics.automatedOperatingCost,
      },
      {
        metric: "Booked Calls",
        Manual: metrics.manualMeetings,
        Automated: metrics.automatedMeetings,
      },
      {
        metric: "Deals Closed",
        Manual: Number((metrics.manualMeetings * (closeRate / 100)).toFixed(1)),
        Automated: Number((metrics.automatedMeetings * (closeRate / 100)).toFixed(1)),
      },
    ];
  }, [metrics, closeRate]);

  return (
    <section id="roi-calculator" className="relative px-[22px] py-[clamp(80px,10vw,130px)]">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="max-w-3xl">
          <span className="section-label">
            <Calculator className="h-3.5 w-3.5" /> ROI Calculator
          </span>
          <h2 className="mt-4 font-display text-3xl md:text-4xl">
            See the exact return on automated sales systems
          </h2>
          <p className="mt-4 text-dim leading-relaxed">
            Calculate your time recaptured, labor costs eliminated, and pipeline growth achieved
            by switching from fragmented manual outreach to autonomous n8n + AI engines.
          </p>
        </Reveal>

        {/* Quick Industry Presets */}
        <Reveal delay={80} className="mt-8">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-muted-ink flex items-center gap-1.5 mr-1 font-medium">
              <Sliders className="h-3.5 w-3.5 text-primary" /> Quick Presets:
            </span>
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => applyPreset(preset)}
                className="rounded-lg border border-border bg-background/60 px-3 py-1.5 text-dim transition-all hover:border-primary/50 hover:bg-[hsl(var(--card-hover))] hover:text-foreground"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Main Grid: Inputs (Left) + Results Dashboard & Chart (Right) */}
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-12">
          {/* Controls Column (5 cols) */}
          <Reveal delay={120} className="lg:col-span-5 h-full">
            <div className="card-surface flex h-full flex-col justify-between p-6 sm:p-7">
              <div>
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <h3 className="font-display text-lg font-bold flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    Your Business Parameters
                  </h3>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-ink">
                    Adjustable
                  </span>
                </div>

                <div className="mt-6 space-y-6">
                  {/* Slider 1: Monthly Leads Targeted */}
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <label htmlFor="leads-slider" className="font-medium text-foreground">
                        Prospects Targeted / Month
                      </label>
                      <span className="font-logo font-bold text-primary">
                        {leadsPerMonth.toLocaleString()} leads
                      </span>
                    </div>
                    <Slider
                      id="leads-slider"
                      value={[leadsPerMonth]}
                      min={100}
                      max={3000}
                      step={50}
                      onValueChange={(val) => setLeadsPerMonth(val[0])}
                      className="mt-3"
                    />
                    <div className="mt-1.5 flex justify-between text-[10px] text-muted-ink">
                      <span>100</span>
                      <span>1,500</span>
                      <span>3,000</span>
                    </div>
                  </div>

                  {/* Slider 2: Hourly Value of Time */}
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <label htmlFor="rate-slider" className="font-medium text-foreground">
                        SDR / Founder Hourly Rate
                      </label>
                      <span className="font-logo font-bold text-primary">
                        ${hourlyRate}/hour
                      </span>
                    </div>
                    <Slider
                      id="rate-slider"
                      value={[hourlyRate]}
                      min={20}
                      max={150}
                      step={5}
                      onValueChange={(val) => setHourlyRate(val[0])}
                      className="mt-3"
                    />
                    <div className="mt-1.5 flex justify-between text-[10px] text-muted-ink">
                      <span>$20/hr</span>
                      <span>$75/hr</span>
                      <span>$150/hr</span>
                    </div>
                  </div>

                  {/* Slider 3: Average Deal Value */}
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <label htmlFor="deal-slider" className="font-medium text-foreground">
                        Average Deal / Client Value
                      </label>
                      <span className="font-logo font-bold text-primary">
                        ${dealValue.toLocaleString()}
                      </span>
                    </div>
                    <Slider
                      id="deal-slider"
                      value={[dealValue]}
                      min={500}
                      max={15000}
                      step={250}
                      onValueChange={(val) => setDealValue(val[0])}
                      className="mt-3"
                    />
                    <div className="mt-1.5 flex justify-between text-[10px] text-muted-ink">
                      <span>$500</span>
                      <span>$7,500</span>
                      <span>$15,000</span>
                    </div>
                  </div>

                  {/* Slider 4: Close Rate */}
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <label htmlFor="close-slider" className="font-medium text-foreground">
                        Meeting-to-Close Rate
                      </label>
                      <span className="font-logo font-bold text-primary">
                        {closeRate}%
                      </span>
                    </div>
                    <Slider
                      id="close-slider"
                      value={[closeRate]}
                      min={5}
                      max={40}
                      step={1}
                      onValueChange={(val) => setCloseRate(val[0])}
                      className="mt-3"
                    />
                    <div className="mt-1.5 flex justify-between text-[10px] text-muted-ink">
                      <span>5%</span>
                      <span>20%</span>
                      <span>40%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assumptions note */}
              <div className="mt-8 rounded-xl border border-border/80 bg-background/50 p-3.5 text-[11px] text-dim leading-relaxed">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>
                    <strong>Model Benchmark:</strong> Manual outbound consumes ~11 min/lead
                    (scraping, writing icebreakers, logging to CRM) with ~1.2% booking rate. Automated stack
                    achieves ~3.8% booking rate with &lt;5s warm response.
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Results Column (7 cols) */}
          <Reveal delay={180} className="lg:col-span-7 space-y-6">
            {/* 4 Stat Metric Cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
              {/* Stat 1: Time Recaptured */}
              <div className="card-surface p-5 border-border hover:border-primary/40">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-ink">Time Reclaimed</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 font-logo text-3xl font-bold text-foreground">
                  {metrics.hoursSaved} <span className="text-sm font-medium text-muted-ink">hrs/mo</span>
                </div>
                <p className="mt-1 text-xs text-dim">
                  ≈ {metrics.workdaysSaved} full work days saved monthly
                </p>
              </div>

              {/* Stat 2: Labor Cost Saved */}
              <div className="card-surface p-5 border-border hover:border-primary/40">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-ink">Direct Cost Savings</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                    <DollarSign className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 font-logo text-3xl font-bold text-foreground">
                  ${metrics.monthlyLaborSavings.toLocaleString()}
                  <span className="text-sm font-medium text-muted-ink">/mo</span>
                </div>
                <p className="mt-1 text-xs text-dim">
                  Net savings after automation costs
                </p>
              </div>

              {/* Stat 3: Extra Qualified Meetings */}
              <div className="card-surface p-5 border-border hover:border-primary/40">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-ink">Monthly Meetings</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <CalendarCheck className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 font-logo text-3xl font-bold text-foreground">
                  {metrics.automatedMeetings}{" "}
                  <span className="text-xs font-normal text-primary">
                    (+{metrics.extraMeetings} calls)
                  </span>
                </div>
                <p className="mt-1 text-xs text-dim">
                  vs {metrics.manualMeetings} meetings with manual outreach
                </p>
              </div>

              {/* Stat 4: Estimated ROI */}
              <div className="card-surface p-5 border-primary/50 bg-[hsl(var(--card-hover))] shadow-[0_10px_30px_-15px_rgba(210,155,74,0.3)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary">Estimated ROI</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 font-logo text-3xl font-bold text-foreground">
                  {metrics.monthlyRoiPercentage}%
                </div>
                <p className="mt-1 text-xs text-dim">
                  +${metrics.annualValue.toLocaleString()} annualized value
                </p>
              </div>
            </div>

            {/* Interactive Visual Chart Container */}
            <div className="card-surface p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <h4 className="font-display text-base font-bold flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Growth Visualization
                  </h4>
                  <p className="text-xs text-muted-ink mt-0.5">
                    {activeTab === "growth"
                      ? "Cumulative 6-month net pipeline value comparison"
                      : "Direct side-by-side operating metrics"}
                  </p>
                </div>

                {/* Chart Toggle buttons */}
                <div className="inline-flex rounded-lg border border-border bg-background/60 p-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab("growth")}
                    className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                      activeTab === "growth"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-dim hover:text-foreground"
                    }`}
                  >
                    6-Month Growth
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("comparison")}
                    className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                      activeTab === "comparison"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-dim hover:text-foreground"
                    }`}
                  >
                    Metrics Breakdown
                  </button>
                </div>
              </div>

              {/* Chart Rendering */}
              <div className="mt-6 h-[280px] w-full">
                {activeTab === "growth" ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={cumulativeData}
                      margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorAuto" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(35, 62%, 56%)" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="hsl(35, 62%, 56%)" stopOpacity={0.0} />
                        </linearGradient>
                        <linearGradient id="colorManual" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#71717a" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#71717a" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(33, 37%, 16%)" vertical={false} />
                      <XAxis
                        dataKey="month"
                        stroke="#a1a1aa"
                        fontSize={11}
                        tickLine={false}
                        axisLine={{ stroke: "hsl(33, 37%, 16%)" }}
                      />
                      <YAxis
                        stroke="#a1a1aa"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => `$${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(30, 43%, 9%)",
                          borderColor: "hsl(33, 42%, 21%)",
                          borderRadius: "12px",
                          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
                          fontSize: "12px",
                          color: "hsl(40, 55%, 92%)",
                        }}
                        formatter={(val: number) => [`$${val.toLocaleString()}`, ""]}
                      />
                      <Legend
                        verticalAlign="top"
                        height={36}
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ fontSize: "12px", color: "#a1a1aa" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="Automated System"
                        stroke="hsl(35, 62%, 56%)"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#colorAuto)"
                      />
                      <Area
                        type="monotone"
                        dataKey="Manual Process"
                        stroke="#71717a"
                        strokeWidth={1.5}
                        strokeDasharray="4 4"
                        fillOpacity={1}
                        fill="url(#colorManual)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={comparisonData}
                      margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(33, 37%, 16%)" vertical={false} />
                      <XAxis
                        dataKey="metric"
                        stroke="#a1a1aa"
                        fontSize={11}
                        tickLine={false}
                        axisLine={{ stroke: "hsl(33, 37%, 16%)" }}
                      />
                      <YAxis
                        stroke="#a1a1aa"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(30, 43%, 9%)",
                          borderColor: "hsl(33, 42%, 21%)",
                          borderRadius: "12px",
                          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
                          fontSize: "12px",
                          color: "hsl(40, 55%, 92%)",
                        }}
                      />
                      <Legend
                        verticalAlign="top"
                        height={36}
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ fontSize: "12px", color: "#a1a1aa" }}
                      />
                      <Bar dataKey="Manual" fill="#71717a" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Automated" fill="hsl(35, 62%, 56%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Action bar below chart */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-4">
                <div className="flex items-center gap-2 text-xs text-dim">
                  <Layers className="h-4 w-4 text-primary" />
                  <span>
                    Net projected value:{" "}
                    <strong className="text-foreground">
                      +${metrics.totalMonthlyGain.toLocaleString()}/mo
                    </strong>{" "}
                    combined time + closed pipeline.
                  </span>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href="#pricing"
                    className="flex-1 sm:flex-none text-center rounded-lg border border-border px-3.5 py-2 text-xs font-semibold text-dim transition-colors hover:border-[hsl(var(--border-hover))] hover:text-foreground"
                  >
                    View Pricing
                  </a>
                  <a
                    href={CAL_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-glow flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold"
                  >
                    <span>Capture This ROI</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default RoiCalculator;
