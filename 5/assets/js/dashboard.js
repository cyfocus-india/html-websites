(() => {
  "use strict";

  const tabs = [...document.querySelectorAll("[data-dashboard-tab]")];
  const panels = [...document.querySelectorAll("[data-dashboard-panel]")];

  const activate = (name, updateHash = true) => {
    tabs.forEach((tab) => {
      const isSelected = tab.dataset.dashboardTab === name;
      tab.setAttribute("aria-selected", String(isSelected));
    });
    panels.forEach((panel) => {
      const matches = panel.dataset.dashboardPanel === name;
      panel.hidden = !matches;
      if (matches) {
        // Focus management for keyboard users
        panel.setAttribute("tabindex", "-1");
        requestAnimationFrame(() => panel.focus({ preventScroll: true }));
        // Trigger progress bar animations if in this panel
        panel.querySelectorAll(".progress-fill").forEach((bar) => {
          bar.classList.remove("is-animated");
          void bar.offsetWidth; // Reflow
          bar.classList.add("is-animated");
        });
      }
    });
    if (updateHash) history.replaceState(null, "", `#${name}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  tabs.forEach((tab) => tab.addEventListener("click", () => activate(tab.dataset.dashboardTab)));

  const initial = location.hash.replace("#", "");
  if (tabs.some((tab) => tab.dataset.dashboardTab === initial)) {
    activate(initial, false);
  }

  // Attendance Calendar
  const calendar = document.querySelector("[data-calendar]");
  const label = document.querySelector("[data-calendar-label]");
  let viewDate = new Date();

  const statusFor = (day, month, year) => {
    const today = new Date();
    const current = new Date(year, month, day);
    if (current > today || current.getDay() === 0) return "";
    if ([5, 12, 19, 26].includes(day)) return "absent";
    if ([1, 2, 3, 4, 6].includes(current.getDay())) return "present";
    return "";
  };

  const renderCalendar = () => {
    if (!calendar || !label) return;
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    
    label.textContent = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(viewDate);
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const cells = weekday.map((day) => `<div class="calendar-cell calendar-cell--head">${day}</div>`);
    
    for (let i = 0; i < firstDay; i += 1) {
      cells.push('<div class="calendar-cell calendar-cell--empty" aria-hidden="true"></div>');
    }
    
    for (let day = 1; day <= days; day += 1) {
      const status = statusFor(day, month, year);
      const className = status ? ` calendar-cell--${status}` : "";
      const statusText = status ? `, status: ${status}` : ", no scheduled batch";
      cells.push(`<div class="calendar-cell${className}" data-day="${day}" role="button" tabindex="0" aria-label="Day ${day}${statusText}" title="Day ${day}${statusText}">${day}</div>`);
    }
    calendar.innerHTML = cells.join("");

    // Add click listeners to calendar cells
    calendar.querySelectorAll(".calendar-cell[data-day]").forEach((cell) => {
      const handleInteraction = () => {
        const day = cell.dataset.day;
        const status = statusFor(Number(day), month, year);
        const monthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format(viewDate);
        if (status === "present") {
          window.northstarToast?.(`${monthName} ${day}: Attended scheduled session.`);
        } else if (status === "absent") {
          window.northstarToast?.(`${monthName} ${day}: Absent. Make-up notes available in Materials.`);
        } else {
          window.northstarToast?.(`${monthName} ${day}: No scheduled class.`);
        }
      };
      cell.addEventListener("click", handleInteraction);
      cell.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleInteraction();
        }
      });
    });
  };

  document.querySelector("[data-calendar-prev]")?.addEventListener("click", () => {
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
    renderCalendar();
  });
  document.querySelector("[data-calendar-next]")?.addEventListener("click", () => {
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
    renderCalendar();
  });
  renderCalendar();

  // Downloadable Materials
  const notes = {
    algebra: `=====================================================
NORTHSTAR TUTORING — ALGEBRA II STUDY NOTES
Topic: Quadratic Functions & Applications
Tutor: Alex Morgan | Grade 10
=====================================================

1. STANDARD FORMS
-----------------
* Standard form: y = ax² + bx + c
* Vertex form:   y = a(x - h)² + k, where (h, k) is the vertex
* Factored form: y = a(x - r₁)(x - r₂), where r₁, r₂ are roots

2. SOLVING METHODS
------------------
* Factoring (when expression factors neatly over rationals)
* Completing the square (essential for vertex form derivation)
* Quadratic formula: x = (-b ± √(b² - 4ac)) / (2a)

3. DISCRIMINANT (Δ = b² - 4ac)
------------------------------
* Δ > 0: Two distinct real roots
* Δ = 0: One repeated real root (tangent to x-axis)
* Δ < 0: Two complex conjugate roots

4. PRACTICE QUESTIONS
---------------------
1) Solve: x² - 7x + 12 = 0
2) Express in vertex form: 2x² - 8x + 5
3) Determine the maximum height of h(t) = -5t² + 20t + 2

Study Goal: Review working before Tuesday's session.`,

    physics: `=====================================================
NORTHSTAR TUTORING — PHYSICS REVISION GUIDE
Topic: Forces, Equilibrium & Newton's Laws
Tutor: Priya Sharma | Grade 10
=====================================================

1. SYSTEMATIC 4-STEP METHOD
---------------------------
Step 1: Draw a clear Free Body Diagram (FBD).
Step 2: Define coordinate axes aligned with acceleration.
Step 3: Resolve all vector forces into components (Fx, Fy).
Step 4: Apply Newton's Second Law: ΣF = ma.

2. KEY RELATIONSHIPS
--------------------
* Weight: W = mg (downward)
* Friction: f_k = μ_k * N (opposes relative motion)
* Inclined Plane:
  - Parallel component: W_parallel = mg * sin(θ)
  - Perpendicular component: W_perp = mg * cos(θ)

3. PRACTICE CHALLENGE
---------------------
A 5.0 kg block rests on a 30° frictionless incline.
Calculate its acceleration down the ramp (g = 9.8 m/s²).

Next Review: Room 2, Monday 16:30.`,

    english: `=====================================================
NORTHSTAR TUTORING — ENGLISH WRITING FRAMEWORK
Topic: The PEEL Analytical Paragraph Method
Tutor: James Lewis | Grade 10
=====================================================

THE PEEL STRUCTURE:
-------------------
[P] POINT:
    State your main claim in one clear, concise sentence.
    Avoid vague phrases like "In this essay I will show...".

[E] EVIDENCE:
    Introduce 1-2 precise direct quotations or specific textual details.
    Always embed quotations into your own grammatical sentence.

[E] EXPLANATION:
    Analyze how specific words, metaphors, or structural devices
    generate meaning and influence the reader.

[L] LINK:
    Connect the analytical claim back to the broader essay thesis
    or overarching theme.

CHECKLIST BEFORE SUBMISSION:
[ ] Is the topic sentence an arguable claim?
[ ] Are quotations seamlessly integrated?
[ ] Did you analyze language rather than merely summarize the plot?`,

    chemistry: `=====================================================
NORTHSTAR TUTORING — CHEMISTRY REVISION NOTES
Topic: Stoichiometry & Chemical Equations
=====================================================

1. MOLE CONCEPT & FORMULAS
--------------------------
* n = m / M  (moles = mass / molar mass)
* N = n * N_A (particles = moles * 6.022 × 10²³)
* Concentration: C = n / V (mol/L)

2. BALANCING STRATEGY
---------------------
* Balance polyatomic ions as single units if present on both sides.
* Balance metals first, then non-metals, then hydrogen and oxygen.
* Double-check total atom counts across reactants and products.`,

    planning: `=====================================================
NORTHSTAR TUTORING — EXAM PREPARATION BLUEPRINT
Topic: Weekly Revision Timetable & Habit Tracker
=====================================================

1. THE 3-CATEGORY AUDIT
-----------------------
* Group A (Secure): Quick review once weekly (15 min).
* Group B (Unsure): Active practice & worked examples (45 min/day).
* Group C (Weak): One-to-one clinic session with tutor.

2. ACTIVE RECALL PROTOCOL
-------------------------
* Closed-book summaries after each study block.
* 3 timed practice questions before ending any session.`
  };

  document.querySelectorAll("[data-download-note]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.downloadNote;
      const content = notes[key] || "Northstar Tutoring study note";
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `northstar-${key}-notes.txt`;
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      window.northstarToast?.(`Downloaded ${key.toUpperCase()} study notes!`);
    });
  });

  // Logout handler
  document.querySelector("[data-logout]")?.addEventListener("click", () => {
    window.northstarToast?.("Logging out...");
    setTimeout(() => {
      location.href = "signin.html";
    }, 400);
  });
})();
