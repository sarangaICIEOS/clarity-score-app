"use client";
import { ArrowRight, Users, FileCheck, BarChart3, Settings, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const roles = [
    {
      title: "Admin",
      icon: Settings,
      description: "Manage the entire system with full control",
      features: ["Add and manage users", "Create projects", "Assign roles and permissions", "Configure sprint settings", "View audit history", "System analytics"],
      href: "/login?role=admin",
      color: "from-purple-500 to-purple-600",
      lightBg: "bg-purple-50",
      darkBg: "dark:bg-purple-900/20"
    },
    {
      title: "Developer",
      icon: Users,
      description: "Submit and track clarity scores",
      features: ["View assigned projects", "Submit clarity forms", "Track submission status", "View feedback", "Update responses", "Download reports"],
      href: "/login?role=developer",
      color: "from-blue-500 to-blue-600",
      lightBg: "bg-blue-50",
      darkBg: "dark:bg-blue-900/20"
    },
    {
      title: "Reporter",
      icon: FileCheck,
      description: "Review and approve submissions",
      features: ["Review submissions", "Provide feedback", "Approve/reject scores", "Manage comments", "Track deadlines", "Generate reports"],
      href: "/login?role=reporter",
      color: "from-emerald-500 to-emerald-600",
      lightBg: "bg-emerald-50",
      darkBg: "dark:bg-emerald-900/20"
    },
    {
      title: "BA (Business Analyst)",
      icon: BarChart3,
      description: "Final approval and analytics",
      features: ["Final approval authority", "View analytics", "Generate insights", "Manage compliance", "Export data", "Strategic reporting"],
      href: "/login?role=ba",
      color: "from-amber-500 to-amber-600",
      lightBg: "bg-amber-50",
      darkBg: "dark:bg-amber-900/20"
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 dark:from-black dark:to-zinc-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-zinc-900 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ClarityScore
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Sprint Management System
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Clarity Score <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Management System</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Track, measure, and approve developer clarity scores throughout each sprint with precision and transparency.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
              Get Started
            </button>
            <button className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-zinc-800 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { title: "Real-time Tracking", desc: "Monitor clarity scores as they're submitted" },
            { title: "Multi-level Approval", desc: "Structured workflow with Reporter and BA gates" },
            { title: "Comprehensive Analytics", desc: "Data-driven insights for sprint planning" }
          ].map((feature, i) => (
            <div key={i} className="p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 dark:border-zinc-700">
              <CheckCircle className="w-8 h-8 text-green-500 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Role Cards */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Choose Your Role
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roles.map((role, idx) => {
              const Icon = role.icon;
              return (
                <div
                  key={idx}
                  className={`group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:shadow-xl ${role.lightBg} ${role.darkBg} dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 hover:border-transparent`}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${role.color} opacity-10 group-hover:opacity-20 transition-opacity rounded-full -mr-16 -mt-16`} />
                  
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${role.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {role.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {role.description}
                    </p>

                    <div className="mb-8">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Key Responsibilities:</p>
                      <ul className="space-y-2">
                        {role.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <span className={`w-1.5 h-1.5 rounded-full mr-2 bg-linear-to-r ${role.color}`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={role.href}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r ${role.color} text-white font-semibold hover:shadow-lg hover:scale-105 transition-all`}
                    >
                      Login as {role.title}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Workflow Section */}
        <div className="mb-20 bg-white dark:bg-zinc-800 rounded-2xl p-12 border border-gray-200 dark:border-zinc-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Approval Workflow
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {[
              { step: "1", title: "Developer", desc: "Submit scores" },
              { step: "→", title: "", desc: "" },
              { step: "2", title: "Reporter", desc: "Review & approve" },
              { step: "→", title: "", desc: "" },
              { step: "3", title: "BA", desc: "Final approval" }
            ].map((item, i) =>
              item.step === "→" ? (
                <div key={i} className="hidden md:block text-2xl text-gray-400 dark:text-gray-600 mx-4">→</div>
              ) : (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold mb-2">
                    {item.step}
                  </div>
                  {item.title && (
                    <>
                      <p className="font-semibold text-gray-900 dark:text-white">{item.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                    </>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {[
            { number: "500+", label: "Active Users" },
            { number: "50+", label: "Projects" },
            { number: "98%", label: "Approval Rate" },
            { number: "24/7", label: "System Uptime" }
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700">
              <div className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black border-t border-gray-800 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {[
              { title: "Product", links: ["Features", "Pricing", "Security"] },
              { title: "Company", links: ["About", "Blog", "Careers"] },
              { title: "Resources", links: ["Documentation", "API", "Support"] },
              { title: "Legal", links: ["Privacy", "Terms", "Contact"] }
            ].map((col, i) => (
              <div key={i}>
                <p className="font-semibold text-white mb-4">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j} className="hover:text-white cursor-pointer transition">{link}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-8 flex justify-between items-center">
            <p>© 2025 ClarityScore Management System • Internal Use Only</p>
            <p className="text-sm">Version 1.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
}