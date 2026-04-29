import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const teams = [
  { id: 1, name: "Arsenal", teamId: "1" },
  { id: 2, name: "Chelsea", teamId: "5" },
  { id: 3, name: "Liverpool", teamId: "9" },
  { id: 4, name: "Manchester City", teamId: "10" },
  { id: 5, name: "Manchester United", teamId: "11" },
  { id: 6, name: "Tottenham Hotspur", teamId: "18" },
  { id: 7, name: "Real Madrid", teamId: "243" },
  { id: 8, name: "Barcelona", teamId: "241" },
];

const clothingPacks = [
  {
    id: "anthem-black",
    name: "Black Anthem Jacket",
    clothingId: "122156",
    category: "Anthem Jacket",
    description: "Clean black prematch anthem jacket for managers and staff.",
    badge: "Popular",
  },
  {
    id: "anthem-white",
    name: "White Anthem Jacket",
    clothingId: "122172",
    category: "Anthem Jacket",
    description: "Minimal white jacket with premium sideline look.",
    badge: "New",
  },
  {
    id: "worldcup-coat",
    name: "World Cup Manager Coat",
    clothingId: "400070",
    category: "Manager Clothing",
    description: "Tournament-style winter coat for World Cup career saves.",
    badge: "FC26",
  },
  {
    id: "training-top",
    name: "Elite Training Top",
    clothingId: "422105",
    category: "Training Wear",
    description: "Modern training top designed for pre-match tunnel scenes.",
    badge: "Beta",
  },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Icon({ name, className = "h-5 w-5" }) {
  const commonProps = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  if (name === "search") {
    return (
      <svg {...commonProps}>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    );
  }

  if (name === "download") {
    return (
      <svg {...commonProps}>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </svg>
    );
  }

  if (name === "shirt") {
    return (
      <svg {...commonProps}>
        <path d="M8 4 5 5.5 3 10l4 2v8h10v-8l4-2-2-4.5L16 4" />
        <path d="M8 4c.7 2 2 3 4 3s3.3-1 4-3" />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg {...commonProps}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      </svg>
    );
  }

  if (name === "check") {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-5" />
      </svg>
    );
  }

  if (name === "lock") {
    return (
      <svg {...commonProps}>
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    );
  }

  if (name === "sparkles") {
    return (
      <svg {...commonProps}>
        <path d="M12 3 10.5 8.5 5 10l5.5 1.5L12 17l1.5-5.5L19 10l-5.5-1.5L12 3Z" />
        <path d="M19 15v4" />
        <path d="M21 17h-4" />
        <path d="M5 3v3" />
        <path d="M6.5 4.5h-3" />
      </svg>
    );
  }

  return null;
}

export function filterTeams(teamList, query) {
  const cleanQuery = String(query || "").trim().toLowerCase();

  if (!cleanQuery) {
    return teamList;
  }

  return teamList.filter((team) => {
    return (
      team.name.toLowerCase().includes(cleanQuery) ||
      String(team.teamId).includes(cleanQuery)
    );
  });
}

export function createGenerationPayload(team, pack) {
  return {
    teamName: team.name,
    teamId: team.teamId,
    clothingName: pack.name,
    clothingId: pack.clothingId,
  };
}

export const componentSelfTests = [
  {
    name: "filterTeams finds a team by name",
    passed: filterTeams(teams, "ars").length === 1 && filterTeams(teams, "ars")[0].name === "Arsenal",
  },
  {
    name: "filterTeams finds a team by ID",
    passed: filterTeams(teams, "241").length === 1 && filterTeams(teams, "241")[0].name === "Barcelona",
  },
  {
    name: "filterTeams returns all teams for an empty query",
    passed: filterTeams(teams, "").length === teams.length,
  },
  {
    name: "createGenerationPayload keeps selected team and clothing IDs",
    passed:
      createGenerationPayload(teams[0], clothingPacks[0]).teamId === "1" &&
      createGenerationPayload(teams[0], clothingPacks[0]).clothingId === "122156",
  },
];

export default function FC26ModGeneratorWebsiteMVP() {
  const [teamQuery, setTeamQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const [selectedPack, setSelectedPack] = useState(clothingPacks[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState("ready");

  const filteredTeams = useMemo(() => filterTeams(teams, teamQuery), [teamQuery]);
  const generationPayload = createGenerationPayload(selectedTeam, selectedPack);

  const handleGenerate = () => {
    setIsGenerating(true);
    setStatus("generating");

    window.setTimeout(() => {
      setIsGenerating(false);
      setStatus("done");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-8 md:px-8 lg:px-10">
        <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-zinc-950 shadow-lg">
              <Icon name="shirt" className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-zinc-400">FC26 Mods</p>
              <h1 className="text-2xl font-semibold tracking-tight">Auto Clothing Generator</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
            <Icon name="lock" className="h-4 w-4" />
            Members-only download system coming next
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
              <Icon name="sparkles" className="h-4 w-4" />
              Choose team, choose clothing, generate mod file
            </div>
            <div className="space-y-4">
              <h2 className="max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl">
                Custom FC26 clothing mods without manual LUA editing.
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-zinc-400">
                This is the first website MVP. The final version will send the selected team ID and clothing ID to your generator backend, edit the LUA template, export the mod, and return a ready download.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="rounded-[2rem] border-white/10 bg-white/[0.04] shadow-2xl">
              <CardContent className="space-y-5 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-zinc-400">Current selection</p>
                    <h3 className="text-2xl font-semibold text-white">{selectedTeam.name}</h3>
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-3 text-right text-zinc-950">
                    <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">Team ID</p>
                    <p className="text-xl font-bold">{selectedTeam.teamId}</p>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-zinc-900 p-5">
                  <p className="text-sm text-zinc-400">Clothing pack</p>
                  <h4 className="mt-1 text-xl font-semibold text-white">{selectedPack.name}</h4>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{selectedPack.description}</p>
                  <div className="mt-4 flex items-center justify-between rounded-2xl bg-black/30 p-4">
                    <span className="text-sm text-zinc-400">Clothing ID</span>
                    <span className="font-mono text-lg text-white">{selectedPack.clothingId}</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-widest text-zinc-500">Backend payload preview</p>
                  <pre className="mt-3 overflow-auto text-xs leading-6 text-zinc-300">
                    {JSON.stringify(generationPayload, null, 2)}
                  </pre>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="h-13 w-full rounded-2xl bg-white text-base font-semibold text-zinc-950 hover:bg-zinc-200"
                >
                  {isGenerating ? "Generating preview..." : "Generate Download"}
                  <Icon name="download" className="ml-2 h-5 w-5" />
                </Button>

                {status === "done" && (
                  <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                    <Icon name="check" className="h-5 w-5" />
                    Demo complete. Next step is connecting this button to the backend generator.
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <main className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Card className="rounded-[2rem] border-white/10 bg-white/[0.04]">
            <CardContent className="space-y-5 p-6">
              <div>
                <h3 className="text-2xl font-semibold text-white">1. Select team</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Later this list can come from Google Sheets, a JSON file, or a database.
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3">
                <Icon name="search" className="h-5 w-5 text-zinc-500" />
                <input
                  value={teamQuery}
                  onChange={(event) => setTeamQuery(event.target.value)}
                  placeholder="Search team name or ID"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
                />
              </div>

              <div className="max-h-[420px] space-y-2 overflow-auto pr-1">
                {filteredTeams.length > 0 ? (
                  filteredTeams.map((team) => (
                    <button
                      key={team.id}
                      onClick={() => setSelectedTeam(team)}
                      className={cx(
                        "flex w-full items-center justify-between rounded-2xl border p-4 text-left transition",
                        selectedTeam.id === team.id
                          ? "border-white bg-white text-zinc-950"
                          : "border-white/10 bg-zinc-900 text-white hover:bg-zinc-800"
                      )}
                    >
                      <span className="font-medium">{team.name}</span>
                      <span className="font-mono text-sm opacity-70">{team.teamId}</span>
                    </button>
                  ))
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-zinc-900 p-4 text-sm text-zinc-400">
                    No teams found. Try another name or ID.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-white/10 bg-white/[0.04]">
            <CardContent className="space-y-5 p-6">
              <div>
                <h3 className="text-2xl font-semibold text-white">2. Select clothing</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Each pack will point to the assets and the clothing ID that must be inserted into the LUA template.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {clothingPacks.map((pack) => (
                  <button
                    key={pack.id}
                    onClick={() => setSelectedPack(pack)}
                    className={cx(
                      "group rounded-3xl border p-5 text-left transition",
                      selectedPack.id === pack.id
                        ? "border-white bg-white text-zinc-950"
                        : "border-white/10 bg-zinc-900 text-white hover:bg-zinc-800"
                    )}
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <div
                        className={cx(
                          "flex h-12 w-12 items-center justify-center rounded-2xl",
                          selectedPack.id === pack.id
                            ? "bg-zinc-950 text-white"
                            : "bg-white/10 text-white"
                        )}
                      >
                        <Icon name="shield" className="h-6 w-6" />
                      </div>
                      <span
                        className={cx(
                          "rounded-full px-3 py-1 text-xs font-semibold",
                          selectedPack.id === pack.id
                            ? "bg-zinc-950 text-white"
                            : "bg-white/10 text-zinc-300"
                        )}
                      >
                        {pack.badge}
                      </span>
                    </div>
                    <p className="text-sm opacity-60">{pack.category}</p>
                    <h4 className="mt-1 text-lg font-semibold">{pack.name}</h4>
                    <p className="mt-2 text-sm leading-6 opacity-70">{pack.description}</p>
                    <div className="mt-4 rounded-2xl bg-black/10 p-3 font-mono text-sm">
                      ID: {pack.clothingId}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
