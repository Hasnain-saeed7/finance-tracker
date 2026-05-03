
import Link from "next/link";
import { ArrowRight, BarChart2, Target, Sparkles, ShieldCheck, Zap, TrendingUp, Landmark } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* Nav */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold text-gray-900 inline-flex items-center gap-2">
            <Landmark size={20} className="text-gray-900" />
            <span>FinanceAI</span>
          </div>
          <nav className="flex items-center gap-3 md:gap-8">
            <Link href="#features" className="hidden md:block text-sm text-gray-500 hover:text-gray-900 transition-colors">Features</Link>
            <Link href="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Sign in</Link>
            <Link href="/register"
              className="bg-gray-900 text-white text-sm font-medium px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-gray-700 transition-colors">
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-12 md:pb-20">
        <div className="max-w-2xl">
          <span className="inline-block text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
            AI-powered finance tracker
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
            Your money,<br />
            finally under control.
          </h1>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed mb-10 max-w-xl">
            Track every rupee, set smart budgets, and get AI-generated insights that tell you exactly where your money is going — and how to keep more of it.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link href="/register"
              className="inline-flex justify-center items-center gap-2 bg-gray-900 text-white font-medium px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
              Start for free <ArrowRight size={16} />
            </Link>
            <Link href="/login"
              className="inline-flex justify-center items-center gap-2 text-gray-600 font-medium px-6 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard preview */}
      <section className="hidden md:block max-w-6xl mx-auto px-6 pb-24">
        <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">

          {/* Browser bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-3 text-xs text-gray-400 bg-white border border-gray-100 rounded px-3 py-1">
              localhost:3000/dashboard
            </span>
          </div>

          {/* App layout */}
          <div className="flex" style={{ height: 340 }}>

            {/* Sidebar */}
            <div className="w-52 bg-white border-r border-gray-100 p-4 flex-shrink-0">
              <p className="text-sm font-bold text-gray-900 px-2 mb-5">💰 FinanceAI</p>
              {[
                { label: "Overview", active: true },
                { label: "Transactions", active: false },
                { label: "Budgets", active: false },
                { label: "AI Insights", active: false },
              ].map(item => (
                <div key={item.label}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm mb-1 ${
                    item.active ? "bg-gray-900 text-white" : "text-gray-400"
                  }`}>
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.active ? "bg-white" : "bg-gray-300"}`} />
                  {item.label}
                </div>
              ))}
            </div>

            {/* Main */}
            <div className="flex-1 p-6 bg-gray-50 overflow-hidden">

              {/* Stat cards */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                {[
                  { label: "Balance", value: "$4,280", color: "text-gray-900" },
                  { label: "Income", value: "$6,500", color: "text-green-600" },
                  { label: "Expenses", value: "$2,220", color: "text-red-500" },
                  { label: "Transactions", value: "42", color: "text-gray-900" },
                ].map(stat => (
                  <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-3">
                    <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                    <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-2 gap-3">

                {/* Bar chart */}
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                  <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide font-medium">Monthly overview</p>
                  <div className="flex items-end gap-2 h-20">
                    {[[65,40],[80,55],[55,70],[85,45],[90,60],[70,50]].map(([inc, exp], i) => (
                      <div key={i} className="flex items-end gap-0.5 flex-1">
                        <div className="bg-green-400 rounded-sm w-full" style={{ height: `${inc}%` }} />
                        <div className="bg-red-300 rounded-sm w-full" style={{ height: `${exp}%` }} />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs text-gray-400"><span className="w-2 h-2 rounded-sm bg-green-400 inline-block"/>Income</span>
                    <span className="flex items-center gap-1 text-xs text-gray-400"><span className="w-2 h-2 rounded-sm bg-red-300 inline-block"/>Expenses</span>
                  </div>
                </div>

                {/* Recent transactions */}
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                  <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide font-medium">Recent transactions</p>
                  <div className="space-y-3">
                    {[
                      { name: "Grocery run", cat: "food", amt: "-$48", col: "text-red-500" },
                      { name: "Salary deposit", cat: "salary", amt: "+$3,200", col: "text-green-600" },
                      { name: "Netflix", cat: "bills", amt: "-$15", col: "text-red-500" },
                    ].map(t => (
                      <div key={t.name} className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-gray-700">{t.name}</p>
                          <p className="text-xs text-gray-300 capitalize">{t.cat}</p>
                        </div>
                        <p className={`text-xs font-semibold ${t.col}`}>{t.amt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="mb-14">
            <p className="text-xs font-semibold text-green-700 uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">
              Everything you need, nothing you don&apos;t
            </h2>
            <p className="text-gray-400 text-base max-w-lg">
              A focused set of tools that cover the full personal finance loop — from logging to learning.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {[
              {
                icon: <BarChart2 size={18} className="text-green-600" />,
                bg: "bg-green-50",
                title: "Live dashboard",
                desc: "Balance, income, and expenses summarized in four stat cards. Charts update the moment you add a transaction.",
              },
              {
                icon: <Sparkles size={18} className="text-purple-600" />,
                bg: "bg-purple-50",
                title: "AI spending insights",
                desc: "Get a plain-English breakdown of your month — top categories, unusual spikes, and one concrete saving tip.",
              },
              {
                icon: <Target size={18} className="text-blue-600" />,
                bg: "bg-blue-50",
                title: "Budget tracking",
                desc: "Set a monthly limit per category. A color-coded progress bar turns red when you're close to the edge.",
              },
              {
                icon: <Zap size={18} className="text-yellow-600" />,
                bg: "bg-yellow-50",
                title: "Fast transaction entry",
                desc: "Type a description, pick a category, hit add. Logging a transaction takes under ten seconds.",
              },
              {
                icon: <TrendingUp size={18} className="text-teal-600" />,
                bg: "bg-teal-50",
                title: "Monthly charts",
                desc: "Bar and pie charts give you a visual history of income vs. expenses across months at a glance.",
              },
              {
                icon: <ShieldCheck size={18} className="text-gray-600" />,
                bg: "bg-gray-100",
                title: "Secure auth",
                desc: "Credentials login with bcrypt-hashed passwords and JWT sessions. Your data stays private.",
              },
            ].map(f => (
              <div key={f.title}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-gray-200 hover:shadow-sm transition-all">
                <div className={`w-9 h-9 ${f.bg} rounded-lg flex items-center justify-center mb-4`}>
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="bg-gray-900 rounded-2xl px-12 py-16 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
              Start tracking in minutes
            </h2>
            <p className="text-gray-400 text-sm">
              Free account. No credit card. Your first insight is one click away.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link href="/register"
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-sm">
              Create free account <ArrowRight size={15} />
            </Link>
            <Link href="/login"
              className="text-gray-400 hover:text-white text-sm transition-colors">
              Sign in →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <span className="font-bold text-gray-900 text-md">FinanceAI</span>
  
          <span className="text-lg  items-center text-shadow-amber-600">CEO :Hasnain Saeed </span>
        </div>
      </footer>

    </div>
  );
}