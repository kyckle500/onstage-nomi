import { useState, useMemo } from "react";

const ADMIN_PASSWORD = "696969";
const POSTER_TYPES = ["Musician / Band", "Venue", "Booking Agent", "Groupie"];
const CITIES = [
  "Traverse City",
  "Acme", "Alba", "Alden", "Bellaire", "Benzonia", "Beulah", "Boyne City",
  "Boyne Falls", "Cadillac", "Cedar", "Central Lake", "Charlevoix",
  "Elk Rapids", "Ellsworth", "Empire", "Fife Lake", "Frankfort",
  "Glen Arbor", "Grayling", "Harbor Springs", "Honor", "Interlochen",
  "Kalkaska", "Kingsley", "Lake Ann", "Lake Leelanau", "Leland",
  "Mancelona", "Maple City", "Northport", "Petoskey", "Suttons Bay",
  "Thompsonville", "Torch Lake", "Williamsburg",
  "Other"
];
const POSTER_ICONS = { "Musician / Band": "🎸", "Venue": "🏠", "Booking Agent": "📋", "Groupie": "🤘" };

const SAMPLE_GIGS = [
  // ── Today 2026-05-21 ──
  { id: 1, artist: "The Jeff Haas Trio", venue: "The Alluvion", city: "Traverse City", date: "2026-05-21", time: "18:00", description: "Jazz trio featuring Laurie Sears and Lisa Flahive. Intimate listening room vibes.", posterType: "Venue", posterName: "The Alluvion", posterEmail: "alluvion@example.com", status: "approved", duplicateFlag: false, batchId: "b1" },
  { id: 2, artist: "Drew Hale", venue: "North Bar", city: "Traverse City", date: "2026-05-21", time: "19:00", description: "Solo Americana set. All originals, cold beer.", posterType: "Musician / Band", posterName: "Drew Hale", posterEmail: "drew@example.com", status: "approved", duplicateFlag: false, batchId: "b2" },
  { id: 3, artist: "Jimmy Olson", venue: "The Parlor", city: "Traverse City", date: "2026-05-21", time: "20:00", description: "Indie folk. Great cocktails, better vibes.", posterType: "Venue", posterName: "The Parlor", posterEmail: "parlor@example.com", status: "approved", duplicateFlag: false, batchId: "b3" },
  { id: 4, artist: "Rob Coonrod", venue: "Soul Squeeze Cellars", city: "Lake Leelanau", date: "2026-05-21", time: "16:00", description: "Acoustic solo set on the patio. Natural wine, natural sounds.", posterType: "Musician / Band", posterName: "Rob Coonrod", posterEmail: "rob@example.com", status: "approved", duplicateFlag: false, batchId: "b4" },
  { id: 5, artist: "Luke Woltanski", venue: "Dune Bird Winery", city: "Northport", date: "2026-05-21", time: "15:00", description: "Lakeside afternoon set at Dune Bird. Bring a blanket.", posterType: "Venue", posterName: "Dune Bird Winery", posterEmail: "dune@example.com", status: "approved", duplicateFlag: false, batchId: "b5" },
  { id: 6, artist: "Open Mic Night", venue: "MiddleCoast Brewing", city: "Traverse City", date: "2026-05-21", time: "19:00", description: "Sign up at the door. All skill levels welcome. Free to attend.", posterType: "Venue", posterName: "MiddleCoast Brewing", posterEmail: "mc@example.com", status: "approved", duplicateFlag: false, batchId: "b6" },
  // ── Tomorrow 2026-05-22 ──
  { id: 7, artist: "Clint Weaner", venue: "Mammoth Distilling", city: "Traverse City", date: "2026-05-22", time: "19:00", description: "Northern Michigan's favorite singer-songwriter. Every other Friday all summer.", posterType: "Musician / Band", posterName: "Clint Weaner", posterEmail: "clint@example.com", status: "approved", duplicateFlag: false, batchId: "b7" },
  { id: 8, artist: "One Hot Robot", venue: "Lake Ann Brewing Co.", city: "Lake Ann", date: "2026-05-22", time: "19:00", description: "High-energy indie rock. Grab a pint and a seat.", posterType: "Booking Agent", posterName: "NMI Bookings", posterEmail: "book@example.com", status: "approved", duplicateFlag: false, batchId: "b8" },
  { id: 9, artist: "Touch of Grey", venue: "Soul Squeeze Cellars", city: "Lake Leelanau", date: "2026-05-22", time: "16:00", description: "Grateful Dead tribute. Wine and good vibes on the patio.", posterType: "Venue", posterName: "Soul Squeeze Cellars", posterEmail: "ss@example.com", status: "approved", duplicateFlag: false, batchId: "b9" },
  { id: 10, artist: "The Fridays", venue: "Northern Latitudes Distillery", city: "Lake Leelanau", date: "2026-05-22", time: "17:00", description: "Acoustic duo playing originals and covers. Free admission.", posterType: "Venue", posterName: "Northern Latitudes Distillery", posterEmail: "nl@example.com", status: "approved", duplicateFlag: false, batchId: "b10" },
  { id: 11, artist: "Spencer Hollenbeck", venue: "Short's Pull Barn", city: "Elk Rapids", date: "2026-05-22", time: "17:00", description: "Solo folk set in the barn. Short's on tap.", posterType: "Venue", posterName: "Short's Pull Barn", posterEmail: "shorts@example.com", status: "approved", duplicateFlag: false, batchId: "b11" },
  { id: 12, artist: "Yankee Station", venue: "Pond Hill Farm", city: "Harbor Springs", date: "2026-05-22", time: "17:00", description: "Classic rock and country covers on the farm. Family friendly.", posterType: "Venue", posterName: "Pond Hill Farm", posterEmail: "ph@example.com", status: "approved", duplicateFlag: false, batchId: "b12" },
  { id: 13, artist: "Ghost Pipe", venue: "Eugene's Record Co-op", city: "Traverse City", date: "2026-05-22", time: "19:00", description: "Bog Wizard & Mothertomb join Ghost Pipe for a heavy night at the co-op.", posterType: "Venue", posterName: "Eugene's Record Co-op", posterEmail: "eugene@example.com", status: "approved", duplicateFlag: false, batchId: "b13" },
  // ── Day After 2026-05-23 ──
  { id: 14, artist: "Hot Flat Pop", venue: "North Bar", city: "Traverse City", date: "2026-05-23", time: "21:00", description: "High energy indie pop. Late night, loud and fun.", posterType: "Musician / Band", posterName: "Hot Flat Pop", posterEmail: "hfp@example.com", status: "approved", duplicateFlag: false, batchId: "b14" },
  { id: 15, artist: "Keith Scott", venue: "Short's Pull Barn", city: "Elk Rapids", date: "2026-05-23", time: "14:00", description: "Afternoon acoustic set. Perfect for a lazy Saturday.", posterType: "Venue", posterName: "Short's Pull Barn", posterEmail: "shorts@example.com", status: "approved", duplicateFlag: false, batchId: "b15" },
  { id: 16, artist: "The Barley Priest", venue: "Chateau Grand Traverse", city: "Traverse City", date: "2026-05-23", time: "17:00", description: "Live music on the winery deck. Stunning bay views included.", posterType: "Venue", posterName: "Chateau Grand Traverse", posterEmail: "cgt@example.com", status: "approved", duplicateFlag: false, batchId: "b16" },
  { id: 17, artist: "Nick Veine", venue: "Left Foot Charley", city: "Traverse City", date: "2026-05-23", time: "14:00", description: "Solo acoustic in the tasting room. Cider and good tunes.", posterType: "Venue", posterName: "Left Foot Charley", posterEmail: "lfc@example.com", status: "approved", duplicateFlag: false, batchId: "b17" },
  { id: 18, artist: "Zeke Clemons", venue: "The Pub", city: "Traverse City", date: "2026-05-23", time: "19:00", description: "Blues and soul. One of TC's best kept secrets.", posterType: "Musician / Band", posterName: "Zeke Clemons", posterEmail: "zeke@example.com", status: "approved", duplicateFlag: false, batchId: "b18" },
  { id: 19, artist: "Dave Johnson", venue: "St. Ambrose Cellars", city: "Beulah", date: "2026-05-23", time: "17:00", description: "Mead, wine, and live music in Beulah. Don't sleep on this one.", posterType: "Venue", posterName: "St. Ambrose Cellars", posterEmail: "sta@example.com", status: "approved", duplicateFlag: false, batchId: "b19" },
  // ── Future dates for calendar ──
  { id: 20, artist: "Clint Weaner", venue: "Mammoth Distilling", city: "Traverse City", date: "2026-06-05", time: "19:00", description: "Every other Friday all summer long.", posterType: "Musician / Band", posterName: "Clint Weaner", posterEmail: "clint@example.com", status: "approved", duplicateFlag: false, batchId: "b7" },
  { id: 21, artist: "Clint Weaner", venue: "Mammoth Distilling", city: "Traverse City", date: "2026-06-19", time: "19:00", description: "Every other Friday all summer long.", posterType: "Musician / Band", posterName: "Clint Weaner", posterEmail: "clint@example.com", status: "approved", duplicateFlag: false, batchId: "b7" },
  { id: 22, artist: "Clint Weaner", venue: "Mammoth Distilling", city: "Traverse City", date: "2026-07-04", time: "19:00", description: "July 4th special show!", posterType: "Musician / Band", posterName: "Clint Weaner", posterEmail: "clint@example.com", status: "approved", duplicateFlag: false, batchId: "b7" },
  { id: 23, artist: "Hot Flat Pop", venue: "Lake Ann Brewing Co.", city: "Lake Ann", date: "2026-06-21", time: "18:00", description: "Outdoor patio show!", posterType: "Musician / Band", posterName: "Hot Flat Pop", posterEmail: "hfp@example.com", status: "approved", duplicateFlag: false, batchId: "b14" },
  { id: 24, artist: "Hot Flat Pop", venue: "Short's Pull Barn", city: "Elk Rapids", date: "2026-07-11", time: "20:00", description: "Summer tour stop.", posterType: "Booking Agent", posterName: "NMI Bookings", posterEmail: "book@example.com", status: "approved", duplicateFlag: false, batchId: "b14" },
  { id: 25, artist: "Drew Hale", venue: "North Bar", city: "Traverse City", date: "2026-07-04", time: "22:00", description: "Late night July 4th set.", posterType: "Musician / Band", posterName: "Drew Hale", posterEmail: "drew@example.com", status: "approved", duplicateFlag: false, batchId: "b2" },
  { id: 26, artist: "The Fridays", venue: "Northern Latitudes Distillery", city: "Lake Leelanau", date: "2026-05-29", time: "17:00", description: "Acoustic duo, originals and covers.", posterType: "Venue", posterName: "Northern Latitudes Distillery", posterEmail: "nl@example.com", status: "approved", duplicateFlag: false, batchId: "b10" },
  { id: 27, artist: "Touch of Grey", venue: "Soul Squeeze Cellars", city: "Lake Leelanau", date: "2026-07-04", time: "16:00", description: "Grateful Dead tribute. Wine and good vibes.", posterType: "Venue", posterName: "Soul Squeeze Cellars", posterEmail: "ss@example.com", status: "approved", duplicateFlag: false, batchId: "b9" },
  { id: 28, artist: "Ghost Pipe", venue: "The Alluvion", city: "Traverse City", date: "2026-06-13", time: "20:00", description: "Return engagement. Heavy and weird.", posterType: "Venue", posterName: "The Alluvion", posterEmail: "alluvion@example.com", status: "approved", duplicateFlag: false, batchId: "b1" },
  { id: 29, artist: "Zeke Clemons", venue: "The Pub", city: "Traverse City", date: "2026-06-14", time: "19:00", description: "Blues and soul night.", posterType: "Musician / Band", posterName: "Zeke Clemons", posterEmail: "zeke@example.com", status: "approved", duplicateFlag: false, batchId: "b18" },
  { id: 30, artist: "Nick Veine", venue: "Left Foot Charley", city: "Traverse City", date: "2026-06-27", time: "14:00", description: "Summer Saturday session.", posterType: "Venue", posterName: "Left Foot Charley", posterEmail: "lfc@example.com", status: "approved", duplicateFlag: false, batchId: "b17" },
];

function formatDate(d) { return new Date(d + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }); }
function formatTime(t) { const [h, m] = t.split(":").map(Number); return `${h % 12 || 12}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`; }
function getMonthDays(year, month) {
  const days = [];
  const first = new Date(year, month, 1).getDay();
  const total = new Date(year, month + 1, 0).getDate();
  for (let i = 0; i < first; i++) days.push(null);
  for (let i = 1; i <= total; i++) days.push(i);
  return days;
}
function toDateStr(year, month, day) { return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`; }

// ── GIG CARD ──────────────────────────────────────────────
function GigCard({ gig, compact = false }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,200,80,0.18)",
      borderRadius: "3px", padding: compact ? "14px 18px" : "20px 24px",
      display: "flex", flexDirection: "column", gap: "6px", position: "relative",
      overflow: "hidden", transition: "all 0.2s", cursor: "default",
    }}
      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,200,80,0.06)"; e.currentTarget.style.borderColor = "rgba(255,200,80,0.45)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,200,80,0.18)"; }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "100%", background: "linear-gradient(180deg,#FFC850,#FF6B35)" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: compact ? "16px" : "20px", fontWeight: "700", color: "#FFF8EE", lineHeight: 1.2 }}>{gig.artist}</div>
          <div style={{ fontFamily: "'Courier Prime',monospace", fontSize: "12px", color: "#FFC850", marginTop: "3px" }}>{gig.venue} · {gig.city}</div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          {!compact && <div style={{ fontFamily: "'Courier Prime',monospace", fontSize: "11px", color: "#888" }}>{formatDate(gig.date)}</div>}
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: compact ? "15px" : "18px", color: "#FF6B35", fontWeight: "700" }}>{formatTime(gig.time)}</div>
        </div>
      </div>
      {gig.description && !compact && <div style={{ fontFamily: "'Lora',serif", fontSize: "13px", color: "#bbb", lineHeight: 1.6 }}>{gig.description}</div>}
      <div style={{ marginTop: "2px" }}>
        <span style={{ fontFamily: "'Courier Prime',monospace", fontSize: "10px", color: "#555" }}>
          Booked by: <span style={{ color: "#888" }}>{POSTER_ICONS[gig.posterType]} {gig.posterType}</span>
        </span>
      </div>
    </div>
  );
}

// ── CALENDAR VIEW ─────────────────────────────────────────
function CalendarView({ gigs }) {
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);

  const days = getMonthDays(calYear, calMonth);
  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

  const gigsByDate = useMemo(() => {
    const map = {};
    gigs.forEach(g => { if (!map[g.date]) map[g.date] = []; map[g.date].push(g); });
    return map;
  }, [gigs]);

  const selectedDateStr = selectedDay ? toDateStr(calYear, calMonth, selectedDay) : null;
  const selectedGigs = selectedDateStr ? (gigsByDate[selectedDateStr] || []) : [];

  const prevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else setCalMonth(m => m - 1); setSelectedDay(null); };
  const nextMonth = () => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } else setCalMonth(m => m + 1); setSelectedDay(null); };

  return (
    <div>
      {/* Calendar header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <button onClick={prevMonth} style={{ background: "transparent", border: "1px solid rgba(255,200,80,0.2)", borderRadius: "2px", color: "#FFC850", fontFamily: "'Courier Prime',monospace", fontSize: "16px", width: "36px", height: "36px", cursor: "pointer" }}>‹</button>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "22px", color: "#FFF8EE", fontWeight: "700" }}>{MONTHS[calMonth]} {calYear}</div>
        <button onClick={nextMonth} style={{ background: "transparent", border: "1px solid rgba(255,200,80,0.2)", borderRadius: "2px", color: "#FFC850", fontFamily: "'Courier Prime',monospace", fontSize: "16px", width: "36px", height: "36px", cursor: "pointer" }}>›</button>
      </div>

      {/* Day labels */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "4px", marginBottom: "6px" }}>
        {DAYS.map(d => <div key={d} style={{ fontFamily: "'Courier Prime',monospace", fontSize: "11px", color: "#555", textAlign: "center", letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 0" }}>{d}</div>)}
      </div>

      {/* Day cells */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "4px" }}>
        {days.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const dateStr = toDateStr(calYear, calMonth, day);
          const hasShows = gigsByDate[dateStr]?.length > 0;
          const count = gigsByDate[dateStr]?.length || 0;
          const isSelected = selectedDay === day;
          const isToday = dateStr === toDateStr(today.getFullYear(), today.getMonth(), today.getDate());
          return (
            <div key={day} onClick={() => setSelectedDay(isSelected ? null : day)} style={{
              aspectRatio: "1", display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", borderRadius: "3px", cursor: hasShows ? "pointer" : "default",
              background: isSelected ? "rgba(255,200,80,0.15)" : hasShows ? "rgba(255,107,53,0.08)" : "transparent",
              border: isSelected ? "1px solid #FFC850" : isToday ? "1px solid rgba(255,200,80,0.3)" : "1px solid transparent",
              transition: "all 0.15s",
            }}
              onMouseEnter={e => { if (hasShows && !isSelected) e.currentTarget.style.background = "rgba(255,200,80,0.08)"; }}
              onMouseLeave={e => { if (hasShows && !isSelected) e.currentTarget.style.background = "rgba(255,107,53,0.08)"; }}
            >
              <div style={{ fontFamily: "'Courier Prime',monospace", fontSize: "13px", color: isSelected ? "#FFC850" : isToday ? "#FFC850" : hasShows ? "#FFF8EE" : "#555", fontWeight: hasShows ? "700" : "400" }}>{day}</div>
              {hasShows && <div style={{ display: "flex", gap: "2px", marginTop: "3px" }}>
                {Array.from({ length: Math.min(count, 4) }).map((_, idx) => (
                  <div key={idx} style={{ width: "4px", height: "4px", borderRadius: "50%", background: isSelected ? "#FFC850" : "#FF6B35" }} />
                ))}
              </div>}
            </div>
          );
        })}
      </div>

      {/* Selected day shows */}
      {selectedDay && (
        <div style={{ marginTop: "24px" }}>
          <div style={{ fontFamily: "'Courier Prime',monospace", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#FFC850", marginBottom: "14px" }}>
            {formatDate(selectedDateStr)} — {selectedGigs.length} {selectedGigs.length === 1 ? "show" : "shows"}
          </div>
          {selectedGigs.length === 0
            ? <div style={{ fontFamily: "'Lora',serif", color: "#555", fontStyle: "italic", fontSize: "14px" }}>Nothing posted yet for this day.</div>
            : <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>{selectedGigs.sort((a, b) => a.time.localeCompare(b.time)).map(g => <GigCard key={g.id} gig={g} compact />)}</div>
          }
        </div>
      )}

      {!selectedDay && (
        <div style={{ marginTop: "20px", fontFamily: "'Lora',serif", fontSize: "13px", color: "#444", fontStyle: "italic", textAlign: "center" }}>
          Tap any highlighted day to see what's playing.
        </div>
      )}
    </div>
  );
}

// ── LIST VIEW ─────────────────────────────────────────────
function ListView({ gigs }) {
  const [filterCity, setFilterCity] = useState("All");
  const [filterVenue, setFilterVenue] = useState("All");
  const [filterArtist, setFilterArtist] = useState("All");

  const uniqueCities = ["All", ...Array.from(new Set(gigs.map(g => g.city))).sort((a,b) => a.localeCompare(b))];
  const uniqueVenues = ["All", ...Array.from(new Set(gigs.filter(g => filterCity === "All" || g.city === filterCity).map(g => g.venue))).sort((a,b) => a.localeCompare(b))];
  const uniqueArtists = ["All", ...Array.from(new Set(gigs.map(g => g.artist))).sort((a,b) => a.localeCompare(b))];

  const filtered = gigs.filter(g => {
    if (filterCity !== "All" && g.city !== filterCity) return false;
    if (filterVenue !== "All" && g.venue !== filterVenue) return false;
    if (filterArtist !== "All" && g.artist !== filterArtist) return false;
    return true;
  }).sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

  

  // Group by date
  const grouped = filtered.reduce((acc, g) => { if (!acc[g.date]) acc[g.date] = []; acc[g.date].push(g); return acc; }, {});

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "28px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontFamily: "'Courier Prime',monospace", fontSize: "10px", color: "#555", textTransform: "uppercase", letterSpacing: "0.1em" }}>City</label>
          <select value={filterCity} onChange={e => { setFilterCity(e.target.value); setFilterVenue("All"); }} style={dropdownStyle}>
            {uniqueCities.map(v => <option key={v} value={v} style={{ background: "#1a1208" }}>{v}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontFamily: "'Courier Prime',monospace", fontSize: "10px", color: "#555", textTransform: "uppercase", letterSpacing: "0.1em" }}>Venue</label>
          <select value={filterVenue} onChange={e => setFilterVenue(e.target.value)} style={dropdownStyle}>
            {uniqueVenues.map(v => <option key={v} value={v} style={{ background: "#1a1208" }}>{v}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontFamily: "'Courier Prime',monospace", fontSize: "10px", color: "#555", textTransform: "uppercase", letterSpacing: "0.1em" }}>Artist</label>
          <select value={filterArtist} onChange={e => setFilterArtist(e.target.value)} style={dropdownStyle}>
            {uniqueArtists.map(a => <option key={a} value={a} style={{ background: "#1a1208" }}>{a}</option>)}
          </select>
        </div>
      </div>

      {Object.keys(grouped).length === 0
        ? <div style={{ textAlign: "center", padding: "60px 0", fontFamily: "'Lora',serif", color: "#555", fontStyle: "italic" }}>No shows match your filters.</div>
        : Object.keys(grouped).sort().map(date => (
          <div key={date} style={{ marginBottom: "28px" }}>
            <div style={{ fontFamily: "'Courier Prime',monospace", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#FF6B35", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid rgba(255,107,53,0.2)" }}>
              {formatDate(date)}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {grouped[date].map(g => <GigCard key={g.id} gig={g} />)}
            </div>
          </div>
        ))
      }
    </div>
  );
}

// ── THIS WEEKEND VIEW ─────────────────────────────────────
const dropdownStyle = {
  background: "#1a1208", border: "1px solid rgba(255,200,80,0.25)", borderRadius: "2px",
  color: "#FFF8EE", fontFamily: "'Courier Prime',monospace", fontSize: "12px",
  padding: "8px 12px", cursor: "pointer", outline: "none", appearance: "none",
  WebkitAppearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23FFC850' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", paddingRight: "30px", minWidth: "160px",
};

function FilterBar({ gigs }) {
  const [filterVenue, setFilterVenue] = useState("All");
  const [filterArtist, setFilterArtist] = useState("All");
  const uniqueVenues = ["All", ...Array.from(new Set(gigs.map(g => g.venue))).sort()];
  const uniqueArtists = ["All", ...Array.from(new Set(gigs.map(g => g.artist))).sort((a,b) => a.localeCompare(b))];
  return { filterVenue, setFilterVenue, filterArtist, setFilterArtist, uniqueVenues, uniqueArtists };
}

function FilterRow({ gigs, filterVenue, setFilterVenue, filterArtist, setFilterArtist }) {
  const uniqueVenues = ["All", ...Array.from(new Set(gigs.map(g => g.venue))).sort()];
  const uniqueArtists = ["All", ...Array.from(new Set(gigs.map(g => g.artist))).sort((a,b) => a.localeCompare(b))];
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label style={{ fontFamily: "'Courier Prime',monospace", fontSize: "10px", color: "#555", textTransform: "uppercase", letterSpacing: "0.1em" }}>Venue</label>
        <select value={filterVenue} onChange={e => setFilterVenue(e.target.value)} style={dropdownStyle}>
          {uniqueVenues.map(v => <option key={v} value={v} style={{ background: "#1a1208" }}>{v}</option>)}
        </select>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label style={{ fontFamily: "'Courier Prime',monospace", fontSize: "10px", color: "#555", textTransform: "uppercase", letterSpacing: "0.1em" }}>Artist</label>
        <select value={filterArtist} onChange={e => setFilterArtist(e.target.value)} style={dropdownStyle}>
          {uniqueArtists.map(a => <option key={a} value={a} style={{ background: "#1a1208" }}>{a}</option>)}
        </select>
      </div>
    </div>
  );
}

function GigGroup({ gigs }) {
  const grouped = gigs.reduce((acc, g) => { if (!acc[g.date]) acc[g.date] = []; acc[g.date].push(g); return acc; }, {});
  return (
    <>
      {Object.keys(grouped).sort().map(date => (
        <div key={date} style={{ marginBottom: "28px" }}>
          <div style={{ fontFamily: "'Courier Prime',monospace", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#FF6B35", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid rgba(255,107,53,0.2)" }}>
            {formatDate(date)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {grouped[date].map(g => <GigCard key={g.id} gig={g} />)}
          </div>
        </div>
      ))}
    </>
  );
}

function TodayView({ gigs }) {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
  const [filterVenue, setFilterVenue] = useState("All");
  const [filterArtist, setFilterArtist] = useState("All");
  const baseGigs = gigs.filter(g => g.date === todayStr);
  const filtered = baseGigs.filter(g => {
    if (filterVenue !== "All" && g.venue !== filterVenue) return false;
    if (filterArtist !== "All" && g.artist !== filterArtist) return false;
    return true;
  }).sort((a, b) => a.time.localeCompare(b.time));
  return (
    <div>
      <FilterRow gigs={baseGigs} filterVenue={filterVenue} setFilterVenue={setFilterVenue} filterArtist={filterArtist} setFilterArtist={setFilterArtist} />
      {filtered.length === 0
        ? <div style={{ textAlign: "center", padding: "60px 0", fontFamily: "'Lora',serif", color: "#555", fontStyle: "italic" }}>Nothing posted for today yet.</div>
        : <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>{filtered.map(g => <GigCard key={g.id} gig={g} />)}</div>
      }
    </div>
  );
}

function WeekendView({ gigs }) {
  const today = new Date();
  const next3 = [0, 1, 2].map(offset => {
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  });
  const [filterVenue, setFilterVenue] = useState("All");
  const [filterArtist, setFilterArtist] = useState("All");
  const baseGigs = gigs.filter(g => next3.includes(g.date));
  const filtered = baseGigs.filter(g => {
    if (filterVenue !== "All" && g.venue !== filterVenue) return false;
    if (filterArtist !== "All" && g.artist !== filterArtist) return false;
    return true;
  }).sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

  return (
    <div>
      <FilterRow gigs={baseGigs} filterVenue={filterVenue} setFilterVenue={setFilterVenue} filterArtist={filterArtist} setFilterArtist={setFilterArtist} />
      {filtered.length === 0
        ? <div style={{ textAlign: "center", padding: "60px 0", fontFamily: "'Lora',serif", color: "#555", fontStyle: "italic" }}>Nothing matches your filters.</div>
        : <GigGroup gigs={filtered} />
      }
    </div>
  );
}

// ── MULTI-DATE SUBMIT FORM ────────────────────────────────



function EndTimeField({ value, onChange, startTime }) {
  const opts = getEndOptions(startTime);
  // If current value is no longer valid given new start time, clear it
  const validValue = opts.find(o => o.val === value) ? value : "";
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={FORM_LABEL_STYLE}>End Time</label>
      <select value={validValue} onChange={e => onChange(e.target.value)} style={{ ...FORM_INPUT_STYLE, cursor: "pointer" }}>
        <option value="" style={{ background: "#1a1208" }}>{startTime ? "Select end time..." : "Select start first..."}</option>
        {opts.map(o => <option key={o.val} value={o.val} style={{ background: "#1a1208" }}>{o.label}</option>)}
      </select>
    </div>
  );
}

function DateField({ value, onChange, inputStyle, labelStyle }) {
  const today = new Date();
  const currentYear = today.getFullYear();

  const parts = value ? value.split("-") : [];
  const [selYear, setSelYear] = useState(parts[0] || String(currentYear));
  const [selMonth, setSelMonth] = useState(parts[1] || "");
  const [selDay, setSelDay] = useState(parts[2] || "");

  const MONTHS = [
    { val: "01", label: "January" }, { val: "02", label: "February" },
    { val: "03", label: "March" }, { val: "04", label: "April" },
    { val: "05", label: "May" }, { val: "06", label: "June" },
    { val: "07", label: "July" }, { val: "08", label: "August" },
    { val: "09", label: "September" }, { val: "10", label: "October" },
    { val: "11", label: "November" }, { val: "12", label: "December" },
  ];

  const daysInMonth = selYear && selMonth
    ? new Date(parseInt(selYear), parseInt(selMonth), 0).getDate()
    : 31;
  const DAYS = Array.from({ length: daysInMonth }, (_, i) => String(i + 1).padStart(2, "0"));
  const YEARS = [currentYear, currentYear + 1].map(y => String(y));

  const handleMonth = (m) => { setSelMonth(m); if (selYear && m && selDay) onChange(`${selYear}-${m}-${selDay}`); };
  const handleDay = (d) => { setSelDay(d); if (selYear && selMonth && d) onChange(`${selYear}-${selMonth}-${d}`); };
  const handleYear = (y) => { setSelYear(y); if (y && selMonth && selDay) onChange(`${y}-${selMonth}-${selDay}`); };

  const selStyle = { ...inputStyle, flex: 1, cursor: "pointer", minWidth: 0 };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={labelStyle}>Date</label>
      <div style={{ display: "flex", gap: "6px" }}>
        <select value={selMonth} onChange={e => handleMonth(e.target.value)} style={{ ...selStyle, flex: 2 }}>
          <option value="" style={{ background: "#1a1208" }}>Month</option>
          {MONTHS.map(m => <option key={m.val} value={m.val} style={{ background: "#1a1208" }}>{m.label}</option>)}
        </select>
        <select value={selDay} onChange={e => handleDay(e.target.value)} style={selStyle}>
          <option value="" style={{ background: "#1a1208" }}>Day</option>
          {DAYS.map(d => <option key={d} value={d} style={{ background: "#1a1208" }}>{parseInt(d)}</option>)}
        </select>
        <select value={selYear} onChange={e => handleYear(e.target.value)} style={selStyle}>
          {YEARS.map(y => <option key={y} value={y} style={{ background: "#1a1208" }}>{y}</option>)}
        </select>
      </div>
    </div>
  );
}

function CityField({ value, onChange }) {
  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);

  const filtered = query.length === 0
    ? CITIES.filter(c => c !== "Other").slice(0, 6)
    : CITIES.filter(c => c.toLowerCase().includes(query.toLowerCase()) && c !== query)
        .sort((a, b) => a.localeCompare(b))
        .slice(0, 6);

  const select = (city) => { onChange(city); setQuery(city); setOpen(false); };

  return (
    <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
      <label style={FORM_LABEL_STYLE}>City / Town</label>
      <input
        type="text"
        value={query}
        placeholder="Type to search cities..."
        onChange={e => { setQuery(e.target.value); onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        style={{ ...FORM_INPUT_STYLE, borderColor: open ? "#FFC850" : "rgba(255,200,80,0.22)" }}
      />
      {open && filtered.length > 0 && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0, zIndex: 100,
          background: "#1a1208", border: "1px solid rgba(255,200,80,0.35)",
          borderTop: "none", borderRadius: "0 0 3px 3px", overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
        }}>
          {filtered.map(city => (
            <div key={city} onMouseDown={() => select(city)} style={{
              fontFamily: "'Lora',serif", fontSize: "14px", color: "#FFF8EE",
              padding: "10px 13px", cursor: "pointer", transition: "background 0.1s",
              borderBottom: "1px solid rgba(255,200,80,0.06)",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,200,80,0.1)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


const FORM_INPUT_STYLE = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,200,80,0.22)", borderRadius: "2px", color: "#FFF8EE", fontFamily: "'Lora',serif", fontSize: "14px", padding: "10px 13px", width: "100%", outline: "none", boxSizing: "border-box", height: "42px" };
const FORM_LABEL_STYLE = { fontFamily: "'Courier Prime',monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#777", marginBottom: "5px", display: "block" };

function buildTimes(startH, endH) {
  const opts = [];
  let h = startH;
  while (true) {
    for (let m of [0, 15, 30, 45]) {
      const val = `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
      const ampm = h >= 12 ? "PM" : "AM";
      const hour = h % 12 || 12;
      opts.push({ val, label: `${hour}:${String(m).padStart(2,"0")} ${ampm}` });
    }
    if (h === endH) break;
    h = (h + 1) % 24;
  }
  return opts;
}
const START_OPTIONS = buildTimes(11, 22).concat([{ val: "23:00", label: "11:00 PM" }]);

function getEndOptions(startVal) {
  // If no start time, show full range from 11am to 2am
  if (!startVal) return buildTimes(11, 1).filter(o => o.val !== "02:00").concat([{ val: "02:00", label: "2:00 AM" }]);
  const [sh, sm] = startVal.split(":").map(Number);
  // Add 60 minutes to get minimum end time
  let minMins = sh * 60 + sm + 60;
  // Build all times from (startTime + 1hr) through 2:00 AM
  const opts = [];
  // Go from minMins up to 26*60 (2am next day = 26 hours)
  let cursor = minMins;
  const endMins = 26 * 60; // 2:00 AM = 26:00
  while (cursor <= endMins) {
    const h = Math.floor(cursor / 60) % 24;
    const m = cursor % 60;
    if (m % 15 === 0) {
      const val = `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
      const ampm = h >= 12 ? "PM" : "AM";
      const hour = h % 12 || 12;
      opts.push({ val, label: `${hour}:${String(m).padStart(2,"0")} ${ampm}` });
    }
    cursor += 15;
  }
  return opts;
}

function FormField({ label, value, onChange, type = "text", opts = null }) {
  if (type === "time") {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={FORM_LABEL_STYLE}>{label}</label>
        <select value={value} onChange={e => onChange(e.target.value)} style={{ ...FORM_INPUT_STYLE, cursor: "pointer" }}>
          <option value="" style={{ background: "#1a1208" }}>Select time...</option>
          {START_OPTIONS.map(o => <option key={o.val} value={o.val} style={{ background: "#1a1208" }}>{o.label}</option>)}
        </select>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={FORM_LABEL_STYLE}>{label}</label>
      {opts
        ? <select value={value} onChange={e => onChange(e.target.value)} style={{ ...FORM_INPUT_STYLE, cursor: "pointer" }}>{opts.map(o => <option key={o} value={o} style={{ background: "#1a1208" }}>{o}</option>)}</select>
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} style={FORM_INPUT_STYLE} onFocus={e => e.target.style.borderColor = "#FFC850"} onBlur={e => e.target.style.borderColor = "rgba(255,200,80,0.22)"} />
      }
    </div>
  );
}

function SubmitForm({ onSubmit }) {
  const [posterType, setPosterType] = useState("Musician / Band");
  const [posterName, setPosterName] = useState("");
  const [posterEmail, setPosterEmail] = useState("");
  const [artist, setArtist] = useState("");
  const [shows, setShows] = useState([{ id: 1, venue: "", city: "", date: "", time: "", endTime: "", description: "" }]);
  const [submitted, setSubmitted] = useState(false);

  const addShow = (copyFrom = null) => {
    const source = copyFrom ? shows.find(s => s.id === copyFrom) : null;
    const base = source
      ? { ...source, id: Date.now(), date: "" }
      : { id: Date.now(), venue: "", city: "", date: "", time: "", endTime: "", description: "" };
    setShows(prev => [...prev, base]);
    // Scroll to bottom so user sees the new show
    setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }), 50);
  };
  const removeShow = (id) => setShows(prev => prev.filter(s => s.id !== id));
  const updateShow = (id, field, value) => setShows(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));

  const handleSubmit = () => {
    if (!artist || !posterName || !posterEmail) return;
    const valid = shows.filter(s => s.venue && s.date && s.time);
    if (valid.length === 0) return;
    const batchId = `batch-${Date.now()}`;
    valid.forEach(s => {
      onSubmit({ ...s, artist, posterType, posterName, posterEmail, id: Date.now() + Math.random(), status: "pending", duplicateFlag: false, batchId });
    });
    setSubmitted(true);
  };

  if (submitted) return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎸</div>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "26px", color: "#FFC850", marginBottom: "12px" }}>You're on the list!</div>
      <div style={{ fontFamily: "'Lora',serif", color: "#aaa", fontSize: "15px", lineHeight: 1.7 }}>Your {shows.length > 1 ? `${shows.filter(s=>s.venue&&s.date&&s.time).length} shows have` : "show has"} been submitted for review.</div>
      <button onClick={() => { setSubmitted(false); setShows([{ id: 1, venue: "", city: "Traverse City", date: "", time: "", description: "" }]); setArtist(""); setPosterName(""); setPosterEmail(""); }} style={{ marginTop: "28px", background: "transparent", border: "1px solid #FFC850", color: "#FFC850", fontFamily: "'Courier Prime',monospace", letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "12px", padding: "10px 24px", cursor: "pointer", borderRadius: "2px" }}>Submit Another</button>
    </div>
  );

  const inputStyle = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,200,80,0.22)", borderRadius: "2px", color: "#FFF8EE", fontFamily: "'Lora',serif", fontSize: "14px", padding: "10px 13px", width: "100%", outline: "none", boxSizing: "border-box" };
  const labelStyle = { fontFamily: "'Courier Prime',monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#777", marginBottom: "5px", display: "block" };
  const buildTimes = (startH, endH) => {
    const opts = [];
    let h = startH;
    while (true) {
      for (let m of [0, 15, 30, 45]) {
        const val = `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
        const ampm = h >= 12 ? "PM" : "AM";
        const hour = h % 12 || 12;
        opts.push({ val, label: `${hour}:${String(m).padStart(2,"0")} ${ampm}` });
      }
      if (h === endH) break;
      h = (h + 1) % 24;
    }
    return opts;
  };
  // Start: 11:00 AM → 11:00 PM (no :15/:30/:45 on the last hour)
  const START_OPTIONS = buildTimes(11, 22).concat([{ val: "23:00", label: "11:00 PM" }]);
  // End: 11:00 AM → 2:00 AM (wraps midnight, stops at 2:00 AM sharp)
  const END_OPTIONS = buildTimes(11, 1).filter(o => !(o.val === "02:00")).concat([{ val: "02:00", label: "2:00 AM" }]);

  const Field = ({ label, value, onChange, type = "text", opts = null }) => {
    if (type === "time") {
      const opts = label.toLowerCase().includes("end") ? END_OPTIONS : START_OPTIONS;
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>{label}</label>
          <select value={value} onChange={e => onChange(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
            <option value="" style={{ background: "#1a1208" }}>Select time...</option>
            {opts.map(o => <option key={o.val} value={o.val} style={{ background: "#1a1208" }}>{o.label}</option>)}
          </select>
        </div>
      );
    }
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={labelStyle}>{label}</label>
        {type === "date"
          ? <input type="date" value={value} onChange={e => onChange(e.target.value)} style={inputStyle} onFocus={e => e.target.style.borderColor = "#FFC850"} onBlur={e => e.target.style.borderColor = "rgba(255,200,80,0.22)"} />
          : opts
          ? <select value={value} onChange={e => onChange(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>{opts.map(o => <option key={o} value={o} style={{ background: "#1a1208" }}>{o}</option>)}</select>
          : <input type={type} value={value} onChange={e => onChange(e.target.value)} style={inputStyle} onFocus={e => e.target.style.borderColor = "#FFC850"} onBlur={e => e.target.style.borderColor = "rgba(255,200,80,0.22)"} />
        }
      </div>
    );
  };

  const posterLabels = { "Musician / Band": { name: "Artist / Band Name", contact: "Your Name", email: "Your Email" }, "Venue": { name: "Artist / Band Performing", contact: "Venue Name", email: "Venue Contact Email" }, "Booking Agent": { name: "Artist / Band Name", contact: "Agency / Your Name", email: "Your Email" }, "Groupie": { name: "Artist / Band Name", contact: "Your Name", email: "Your Email" } };
  const pl = posterLabels[posterType];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

      {/* Who's posting */}
      <div>
        <label style={labelStyle}>I am a...</label>
        <div style={{ display: "flex", gap: "8px" }}>
          {POSTER_TYPES.map(t => (
            <button key={t} onClick={() => setPosterType(t)} style={{ flex: 1, background: posterType === t ? "rgba(255,200,80,0.12)" : "transparent", border: `1px solid ${posterType === t ? "#FFC850" : "rgba(255,255,255,0.1)"}`, borderRadius: "2px", color: posterType === t ? "#FFC850" : "#555", fontFamily: "'Courier Prime',monospace", fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase", padding: "10px 4px", cursor: "pointer", transition: "all 0.15s" }}>
              {POSTER_ICONS[t]}<br />{t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ height: "1px", background: "rgba(255,200,80,0.08)" }} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
        <FormField label={pl.contact} value={posterName} onChange={setPosterName} />
        <FormField label={pl.email} value={posterEmail} onChange={setPosterEmail} type="email" />
      </div>
      <FormField label={pl.name} value={artist} onChange={setArtist} />

      <div style={{ height: "1px", background: "rgba(255,200,80,0.08)" }} />

      {/* Shows */}
      <div>
        <div style={{ fontFamily: "'Courier Prime',monospace", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#FFC850", marginBottom: "14px" }}>
          Shows — {shows.length} {shows.length === 1 ? "date" : "dates"}
        </div>

        {shows.map((show, idx) => (
          <div key={show.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,200,80,0.12)", borderRadius: "3px", padding: "16px", marginBottom: "12px", position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <div style={{ fontFamily: "'Courier Prime',monospace", fontSize: "10px", color: "#555", letterSpacing: "0.1em", textTransform: "uppercase" }}>Show {idx + 1}</div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => addShow(show.id)} title="Copy venue, time & details — just pick a new date" style={{ background: "transparent", border: "1px solid rgba(255,200,80,0.2)", borderRadius: "2px", color: "#FFC850", fontFamily: "'Courier Prime',monospace", fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 10px", cursor: "pointer" }}>+ Copy Event</button>
                {shows.length > 1 && <button onClick={() => removeShow(show.id)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2px", color: "#555", fontFamily: "'Courier Prime',monospace", fontSize: "10px", padding: "4px 10px", cursor: "pointer" }}>Remove</button>}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <DateField value={show.date} onChange={v => updateShow(show.id, "date", v)} inputStyle={FORM_INPUT_STYLE} labelStyle={FORM_LABEL_STYLE} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <FormField label="Start Time" value={show.time} onChange={v => updateShow(show.id, "time", v)} type="time" />
                <EndTimeField value={show.endTime || ""} onChange={v => updateShow(show.id, "endTime", v)} startTime={show.time} />
              </div>
              <FormField label="Venue" value={show.venue} onChange={v => updateShow(show.id, "venue", v)} />
              <CityField value={show.city} onChange={v => updateShow(show.id, "city", v)} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={labelStyle}>About this show (optional)</label>
                <textarea value={show.description} onChange={e => updateShow(show.id, "description", e.target.value)} rows={2} style={{ ...FORM_INPUT_STYLE, height: "auto", padding: "10px 13px", resize: "vertical", lineHeight: 1.5 }} onFocus={e => e.target.style.borderColor = "#FFC850"} onBlur={e => e.target.style.borderColor = "rgba(255,200,80,0.22)"} />
              </div>
            </div>
          </div>
        ))}

        <button onClick={() => addShow()} style={{ width: "100%", background: "transparent", border: "1px dashed rgba(255,200,80,0.25)", borderRadius: "3px", color: "#666", fontFamily: "'Courier Prime',monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "12px", cursor: "pointer", transition: "all 0.15s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#FFC850"; e.currentTarget.style.color = "#FFC850"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,200,80,0.25)"; e.currentTarget.style.color = "#666"; }}
        >
          + Add Another Date
        </button>
      </div>

      <button onClick={handleSubmit} style={{ background: "linear-gradient(135deg,#FFC850,#FF6B35)", border: "none", borderRadius: "2px", color: "#1a0e00", fontFamily: "'Courier Prime',monospace", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", fontSize: "13px", padding: "14px", cursor: "pointer" }}>
        Submit {shows.length > 1 ? `${shows.length} Shows` : "Show"} →
      </button>
      <div style={{ fontFamily: "'Courier Prime',monospace", fontSize: "10px", color: "#444", textAlign: "center" }}>Reviewed before going live · Email never shown publicly</div>

      <div style={{ marginTop: "8px", padding: "14px 18px", background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,200,80,0.12)", borderRadius: "3px", textAlign: "center" }}>
        <span style={{ fontFamily: "'Lora',serif", fontSize: "13px", color: "#555", fontStyle: "italic" }}>Too lazy to fill this out? </span>
        <a href="mailto:onstagenomi@gmail.com?subject=Post my show for me&body=Artist:%0D%0AVenue:%0D%0ACity:%0D%0ADate:%0D%0AStart Time:%0D%0AEnd Time:%0D%0AAbout the show:" style={{ fontFamily: "'Courier Prime',monospace", fontSize: "11px", color: "#FFC850", letterSpacing: "0.06em", textDecoration: "underline", textUnderlineOffset: "3px" }}>
          Send me the details and I'll post it for you →
        </a>
      </div>
    </div>
  );
}

// ── ADMIN PANEL ───────────────────────────────────────────
function AdminPanel({ gigs, onApprove, onReject, onDelete, onMerge, onBatchApprove }) {
  const pending = gigs.filter(g => g.status === "pending");
  const flagged = pending.filter(g => g.duplicateFlag);
  const clean = pending.filter(g => !g.duplicateFlag);
  const approved = gigs.filter(g => g.status === "approved");

  // Group clean pending by batchId
  const batches = clean.reduce((acc, g) => { const k = g.batchId || g.id; if (!acc[k]) acc[k] = []; acc[k].push(g); return acc; }, {});

  const cardStyle = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "3px", padding: "14px 18px", marginBottom: "10px" };
  const Btn = ({ label, onClick, accent }) => <button onClick={onClick} style={{ background: accent ? "linear-gradient(135deg,#FFC850,#FF6B35)" : "transparent", border: accent ? "none" : "1px solid #333", borderRadius: "2px", color: accent ? "#1a0e00" : "#777", fontFamily: "'Courier Prime',monospace", fontWeight: accent ? "700" : "400", fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", padding: "6px 12px", cursor: "pointer" }}>{label}</button>;
  const Section = ({ title, count, color, children }) => <div style={{ marginBottom: "32px" }}><div style={{ fontFamily: "'Courier Prime',monospace", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: color || "#666", marginBottom: "14px" }}>{title} ({count})</div>{children}</div>;

  return (
    <div>
      <Section title="⚠ Possible Duplicates" count={flagged.length} color="#FF6B35">
        {flagged.length === 0
          ? <div style={{ fontFamily: "'Lora',serif", color: "#444", fontSize: "13px" }}>None flagged.</div>
          : flagged.map(gig => {
            const orig = gigs.find(g => g.id === gig.duplicateOf);
            return (
              <div key={gig.id} style={{ ...cardStyle, borderColor: "rgba(255,107,53,0.25)", background: "rgba(255,107,53,0.04)" }}>
                <div style={{ fontFamily: "'Courier Prime',monospace", fontSize: "10px", color: "#FF6B35", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>⚠ Possible duplicate of listing #{gig.duplicateOf}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
                  {[["Existing", orig, "#333"], ["New submission", gig, "rgba(255,200,80,0.05)"]].map(([lbl, g, bg]) => g && (
                    <div key={lbl} style={{ background: bg, padding: "10px", borderRadius: "2px" }}>
                      <div style={{ fontFamily: "'Courier Prime',monospace", fontSize: "9px", color: "#444", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "5px" }}>{lbl}</div>
                      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "13px", color: "#FFF8EE" }}>{g.artist}</div>
                      <div style={{ fontFamily: "'Courier Prime',monospace", fontSize: "10px", color: "#888" }}>{g.venue} · {formatDate(g.date)}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
                  <Btn label="✓ Approve Anyway" onClick={() => onApprove(gig.id)} accent />
                  <Btn label="⊕ Merge" onClick={() => onMerge(gig.id)} />
                  <Btn label="✕ Reject" onClick={() => onReject(gig.id)} />
                </div>
              </div>
            );
          })
        }
      </Section>

      <Section title="Pending Review" count={clean.length} color="#FFC850">
        {clean.length === 0
          ? <div style={{ fontFamily: "'Lora',serif", color: "#444", fontSize: "13px" }}>All clear.</div>
          : Object.entries(batches).map(([batchId, batchGigs]) => (
            <div key={batchId} style={{ ...cardStyle, borderColor: "rgba(255,200,80,0.15)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "16px", color: "#FFF8EE", fontWeight: "700" }}>{batchGigs[0].artist}</div>
                  <div style={{ fontFamily: "'Courier Prime',monospace", fontSize: "11px", color: "#888", marginTop: "2px" }}>
                    {batchGigs[0].posterName} · {batchGigs[0].posterEmail}
                  </div>
                  <div style={{ fontFamily: "'Courier Prime',monospace", fontSize: "10px", color: "#555", marginTop: "2px" }}>
                    {batchGigs.length} {batchGigs.length === 1 ? "show" : "shows"} submitted
                  </div>
                </div>
                <Btn label={`✓ Approve All ${batchGigs.length > 1 ? `(${batchGigs.length})` : ""}`} onClick={() => onBatchApprove(batchGigs.map(g => g.id))} accent />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                {batchGigs.map(g => (
                  <div key={g.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)", padding: "8px 12px", borderRadius: "2px" }}>
                    <div>
                      <span style={{ fontFamily: "'Courier Prime',monospace", fontSize: "11px", color: "#FFC850" }}>{formatDate(g.date)}</span>
                      <span style={{ fontFamily: "'Courier Prime',monospace", fontSize: "11px", color: "#666", marginLeft: "8px" }}>{formatTime(g.time)} · {g.venue}, {g.city}</span>
                    </div>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <Btn label="✓" onClick={() => onApprove(g.id)} accent />
                      <Btn label="✕" onClick={() => onReject(g.id)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        }
      </Section>

      <Section title="Live on the Board" count={approved.length} color="#444">
        {approved.sort((a,b) => a.date.localeCompare(b.date)).map(g => (
          <div key={g.id} style={{ ...cardStyle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "14px", color: "#FFF8EE" }}>{g.artist}</span>
              <span style={{ fontFamily: "'Courier Prime',monospace", fontSize: "10px", color: "#555", marginLeft: "8px" }}>{g.venue} · {formatDate(g.date)}</span>
            </div>
            <button onClick={() => onDelete(g.id)} style={{ background: "transparent", border: "none", color: "#333", fontFamily: "'Courier Prime',monospace", fontSize: "10px", cursor: "pointer", padding: "4px 8px" }}>remove</button>
          </div>
        ))}
      </Section>
    </div>
  );
}

// ── ROOT APP ──────────────────────────────────────────────

const SAMPLE_SALES = [
  { id: 1, name: "The Johnson Family Sale", address: "1842 Barlow St", city: "Traverse City", date: "2026-05-23", startTime: "08:00", endTime: "14:00", description: "Furniture, tools, kids clothes, vintage kitchenware. Everything must go!", highlights: ["Furniture", "Tools", "Vintage"], status: "approved" },
  { id: 2, name: "Multi-Family Blowout", address: "445 Peninsula Dr", city: "Traverse City", date: "2026-05-23", startTime: "07:00", endTime: "13:00", description: "Six families worth of stuff. Antiques, bikes, electronics, baby gear.", highlights: ["Antiques", "Bikes", "Electronics"], status: "approved" },
  { id: 3, name: "Moving Sale — Everything Goes", address: "221 Oak St", city: "Elk Rapids", date: "2026-05-24", startTime: "09:00", endTime: "15:00", description: "Relocating out of state. Appliances, bedroom sets, outdoor furniture, art.", highlights: ["Appliances", "Furniture", "Art"], status: "approved" },
  { id: 4, name: "Grandma's Attic Sale", address: "78 Cherry Ln", city: "Suttons Bay", date: "2026-05-24", startTime: "08:00", endTime: "12:00", description: "Decades of treasures. Glassware, linens, records, old tools, holiday decor.", highlights: ["Glassware", "Records", "Collectibles"], status: "approved" },
  { id: 5, name: "Garage & Garden Sale", address: "304 Garfield Ave", city: "Traverse City", date: "2026-05-22", startTime: "08:00", endTime: "14:00", description: "Lawn equipment, garden tools, patio furniture, and lots of plants.", highlights: ["Garden", "Tools", "Plants"], status: "approved" },
];

const SALE_HIGHLIGHTS = ["Furniture", "Tools", "Antiques", "Clothing", "Electronics", "Toys", "Books", "Vintage", "Appliances", "Art", "Bikes", "Records", "Garden", "Collectibles", "Other"];

function formatSaleTime(t) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2,"0")} ${h >= 12 ? "PM" : "AM"}`;
}

function SaleCard({ sale }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,200,80,0.18)",
      borderRadius: "3px", padding: "18px 22px", position: "relative", overflow: "hidden",
      transition: "all 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,200,80,0.06)"; e.currentTarget.style.borderColor = "rgba(255,200,80,0.45)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,200,80,0.18)"; }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "100%", background: "linear-gradient(180deg,#FFC850,#FF6B35)" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "18px", fontWeight: "700", color: "#FFF8EE", lineHeight: 1.2 }}>{sale.name}</div>
          <div style={{ fontFamily: "'Courier Prime',monospace", fontSize: "12px", color: "#FFC850", marginTop: "4px" }}>{sale.address} · {sale.city}</div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontFamily: "'Courier Prime',monospace", fontSize: "11px", color: "#aaa" }}>{formatDate(sale.date)}</div>
          <div style={{ fontFamily: "'Courier Prime',monospace", fontSize: "13px", color: "#FF6B35", fontWeight: "700", marginTop: "2px" }}>{formatSaleTime(sale.startTime)} – {formatSaleTime(sale.endTime)}</div>
        </div>
      </div>
      {sale.description && <div style={{ fontFamily: "'Lora',serif", fontSize: "13px", color: "#bbb", lineHeight: 1.6, marginTop: "8px" }}>{sale.description}</div>}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "10px" }}>
        {sale.highlights.map(h => (
          <span key={h} style={{ fontFamily: "'Courier Prime',monospace", fontSize: "10px", color: "#888", background: "rgba(255,200,80,0.08)", border: "1px solid rgba(255,200,80,0.15)", borderRadius: "2px", padding: "2px 8px" }}>{h}</span>
        ))}
      </div>
    </div>
  );
}

function SaleSubmitForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState({ month: "", day: "", year: String(new Date().getFullYear()) });
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [highlights, setHighlights] = useState([]);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleHighlight = (h) => setHighlights(prev => prev.includes(h) ? prev.filter(x => x !== h) : [...prev, h]);

  const handleSubmit = () => {
    if (!name || !address || !city || !date.month || !date.day || !startTime) return;
    const dateStr = `${date.year}-${date.month}-${date.day}`;
    onSubmit({ id: Date.now(), name, address, city, date: dateStr, startTime, endTime, description, highlights, email, status: "pending" });
    setSubmitted(true);
  };

  if (submitted) return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>🏷️</div>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "26px", color: "#FFC850", marginBottom: "12px" }}>Sale posted!</div>
      <div style={{ fontFamily: "'Lora',serif", color: "#aaa", fontSize: "15px", lineHeight: 1.7 }}>Under review and will go live shortly.</div>
      <button onClick={() => setSubmitted(false)} style={{ marginTop: "24px", background: "transparent", border: "1px solid #FFC850", color: "#FFC850", fontFamily: "'Courier Prime',monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "10px 24px", cursor: "pointer", borderRadius: "2px" }}>Post Another</button>
    </div>
  );

  const IS = FORM_INPUT_STYLE;
  const LS = FORM_LABEL_STYLE;
  const MONTHS = [
    { val: "01", label: "January" }, { val: "02", label: "February" }, { val: "03", label: "March" },
    { val: "04", label: "April" }, { val: "05", label: "May" }, { val: "06", label: "June" },
    { val: "07", label: "July" }, { val: "08", label: "August" }, { val: "09", label: "September" },
    { val: "10", label: "October" }, { val: "11", label: "November" }, { val: "12", label: "December" },
  ];
  const daysInMonth = date.month ? new Date(parseInt(date.year), parseInt(date.month), 0).getDate() : 31;
  const DAYS = Array.from({ length: daysInMonth }, (_, i) => String(i + 1).padStart(2, "0"));
  const YEARS = [new Date().getFullYear(), new Date().getFullYear() + 1].map(String);
  const saleEndOpts = getEndOptions(startTime);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <label style={LS}>Sale Name</label>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. The Johnson Family Sale" style={IS} onFocus={e => e.target.style.borderColor="#FFC850"} onBlur={e => e.target.style.borderColor="rgba(255,200,80,0.22)"} />
      </div>
      <div>
        <label style={LS}>Street Address</label>
        <input value={address} onChange={e => setAddress(e.target.value)} placeholder="1842 Barlow St" style={IS} onFocus={e => e.target.style.borderColor="#FFC850"} onBlur={e => e.target.style.borderColor="rgba(255,200,80,0.22)"} />
      </div>
      <CityField value={city} onChange={setCity} />
      <div>
        <label style={LS}>Date</label>
        <div style={{ display: "flex", gap: "6px" }}>
          <select value={date.month} onChange={e => setDate(d => ({...d, month: e.target.value}))} style={{ ...IS, flex: 2, cursor: "pointer" }}>
            <option value="">Month</option>
            {MONTHS.map(m => <option key={m.val} value={m.val} style={{ background: "#1a1208" }}>{m.label}</option>)}
          </select>
          <select value={date.day} onChange={e => setDate(d => ({...d, day: e.target.value}))} style={{ ...IS, flex: 1, cursor: "pointer" }}>
            <option value="">Day</option>
            {DAYS.map(d => <option key={d} value={d} style={{ background: "#1a1208" }}>{parseInt(d)}</option>)}
          </select>
          <select value={date.year} onChange={e => setDate(d => ({...d, year: e.target.value}))} style={{ ...IS, flex: 1, cursor: "pointer" }}>
            {YEARS.map(y => <option key={y} value={y} style={{ background: "#1a1208" }}>{y}</option>)}
          </select>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div>
          <label style={LS}>Start Time</label>
          <select value={startTime} onChange={e => setStartTime(e.target.value)} style={{ ...IS, cursor: "pointer" }}>
            <option value="">Select time...</option>
            {START_OPTIONS.map(o => <option key={o.val} value={o.val} style={{ background: "#1a1208" }}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label style={LS}>End Time</label>
          <select value={endTime} onChange={e => setEndTime(e.target.value)} style={{ ...IS, cursor: "pointer" }}>
            <option value="">{startTime ? "Select end..." : "Start first..."}</option>
            {saleEndOpts.map(o => <option key={o.val} value={o.val} style={{ background: "#1a1208" }}>{o.label}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label style={LS}>What are you selling? (pick all that apply)</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}>
          {SALE_HIGHLIGHTS.map(h => (
            <button key={h} onClick={() => toggleHighlight(h)} style={{
              fontFamily: "'Courier Prime',monospace", fontSize: "10px", letterSpacing: "0.07em",
              textTransform: "uppercase", padding: "5px 10px", borderRadius: "2px", cursor: "pointer",
              border: highlights.includes(h) ? "1px solid #FFC850" : "1px solid rgba(255,255,255,0.1)",
              background: highlights.includes(h) ? "rgba(255,200,80,0.12)" : "transparent",
              color: highlights.includes(h) ? "#FFC850" : "#666", transition: "all 0.15s",
            }}>{h}</button>
          ))}
        </div>
      </div>
      <div>
        <label style={LS}>Description (optional)</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="What else should people know?" style={{ ...IS, height: "auto", padding: "10px 13px", resize: "vertical", lineHeight: 1.6 }} onFocus={e => e.target.style.borderColor="#FFC850"} onBlur={e => e.target.style.borderColor="rgba(255,200,80,0.22)"} />
      </div>
      <div>
        <label style={LS}>Your Email (not shown publicly)</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={IS} onFocus={e => e.target.style.borderColor="#FFC850"} onBlur={e => e.target.style.borderColor="rgba(255,200,80,0.22)"} />
      </div>
      <button onClick={handleSubmit} style={{ background: "linear-gradient(135deg,#FFC850,#FF6B35)", border: "none", borderRadius: "2px", color: "#1a0e00", fontFamily: "'Courier Prime',monospace", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", fontSize: "13px", padding: "14px", cursor: "pointer" }}>
        Post My Sale →
      </button>
      <div style={{ fontFamily: "'Courier Prime',monospace", fontSize: "10px", color: "#444", textAlign: "center" }}>Reviewed before going live · Address only shown after approval</div>
    </div>
  );
}

function GarageSaleSection() {
  const [view, setView] = useState("browse");
  const [sales, setSales] = useState(SAMPLE_SALES);
  const [filterCity, setFilterCity] = useState("All");

  const approved = sales.filter(s => s.status === "approved");
  const uniqueCities = ["All", ...Array.from(new Set(approved.map(s => s.city))).sort((a,b) => a.localeCompare(b))];
  const filtered = approved
    .filter(s => filterCity === "All" || s.city === filterCity)
    .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime));
  const grouped = filtered.reduce((acc, s) => { if (!acc[s.date]) acc[s.date] = []; acc[s.date].push(s); return acc; }, {});

  const chipStyle = (active) => ({
    fontFamily: "'Courier Prime',monospace", fontSize: "10px", letterSpacing: "0.07em",
    textTransform: "uppercase", padding: "4px 9px", borderRadius: "2px",
    border: active ? "1px solid #FFC850" : "1px solid rgba(255,255,255,0.1)",
    background: active ? "rgba(255,200,80,0.12)" : "transparent",
    color: active ? "#FFC850" : "#666", cursor: "pointer", transition: "all 0.15s",
  });

  return (
    <div>
      {/* Sub nav */}
      <div style={{ display: "flex", gap: "0", marginBottom: "28px", borderBottom: "1px solid rgba(255,200,80,0.12)" }}>
        {[["browse", "Sales This Week"], ["post", "Post a Sale"]].map(([id, label]) => (
          <button key={id} onClick={() => setView(id)} style={{ background: "transparent", border: "none", borderBottom: view === id ? "2px solid #FFC850" : "2px solid transparent", color: view === id ? "#FFC850" : "#555", fontFamily: "'Courier Prime',monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "10px 20px", cursor: "pointer", marginBottom: "-1px" }}>{label}</button>
        ))}
      </div>

      {view === "browse" && (
        <div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "24px", alignItems: "center" }}>
            <span style={{ fontFamily: "'Courier Prime',monospace", fontSize: "10px", color: "#444", textTransform: "uppercase", letterSpacing: "0.08em" }}>City:</span>
            {uniqueCities.map(c => <button key={c} onClick={() => setFilterCity(c)} style={chipStyle(filterCity === c)}>{c}</button>)}
          </div>
          {Object.keys(grouped).length === 0
            ? <div style={{ textAlign: "center", padding: "60px 0", fontFamily: "'Lora',serif", color: "#555", fontStyle: "italic" }}>No sales posted yet. Be the first!</div>
            : Object.keys(grouped).sort().map(date => (
              <div key={date} style={{ marginBottom: "28px" }}>
                <div style={{ fontFamily: "'Courier Prime',monospace", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#FF6B35", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid rgba(255,107,53,0.2)" }}>
                  {formatDate(date)}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {grouped[date].map(s => <SaleCard key={s.id} sale={s} />)}
                </div>
              </div>
            ))
          }
          <div style={{ marginTop: "32px", textAlign: "center", fontFamily: "'Courier Prime',monospace", fontSize: "10px", color: "#333" }}>
            Having a sale?{" "}
            <button onClick={() => setView("post")} style={{ background: "none", border: "none", color: "#FFC850", fontFamily: "'Courier Prime',monospace", fontSize: "10px", cursor: "pointer", textDecoration: "underline" }}>Post it here →</button>
          </div>
        </div>
      )}

      {view === "post" && (
        <div>
          <div style={{ marginBottom: "24px" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "22px", color: "#FFF8EE", marginBottom: "6px" }}>Post Your Sale</div>
            <div style={{ fontFamily: "'Lora',serif", fontSize: "14px", color: "#666", lineHeight: 1.6 }}>List your garage sale for the whole NMI community. Reviewed before going live.</div>
          </div>
          <SaleSubmitForm onSubmit={(sale) => { setSales(prev => [...prev, sale]); setView("browse"); }} />
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [section, setSection] = useState("music");
  const [tab, setTab] = useState("board");
  const [boardView, setBoardView] = useState("weekend");
  const [gigs, setGigs] = useState(SAMPLE_GIGS);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [tapTimer, setTapTimer] = useState(null);

  const SECTIONS = [
    { id: "music", icon: "🎸", label: "Live Music" },
    { id: "karaoke", icon: "🎤", label: "Karaoke" },
    { id: "trivia", icon: "🧠", label: "Trivia" },
  ];

  const handleSecretTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);
    if (tapTimer) clearTimeout(tapTimer);
    if (newCount >= 5) {
      setTapCount(0);
      setTab("admin");
    } else {
      const t = setTimeout(() => setTapCount(0), 2000);
      setTapTimer(t);
    }
  };

  const approved = gigs.filter(g => g.status === "approved");
  const pendingCount = gigs.filter(g => g.status === "pending").length;
  const flaggedCount = gigs.filter(g => g.status === "pending" && g.duplicateFlag).length;

  const handleSubmit = (gig) => {
    const isDupe = gigs.some(g => g.status === "approved" && g.artist.toLowerCase() === gig.artist.toLowerCase() && g.venue.toLowerCase() === gig.venue.toLowerCase() && g.date === gig.date);
    const dupeOf = isDupe ? gigs.find(g => g.status === "approved" && g.artist.toLowerCase() === gig.artist.toLowerCase() && g.venue.toLowerCase() === gig.venue.toLowerCase() && g.date === gig.date)?.id : null;
    setGigs(prev => [...prev, { ...gig, duplicateFlag: isDupe, duplicateOf: dupeOf }]);
  };
  const handleApprove = (id) => setGigs(prev => prev.map(g => g.id === id ? { ...g, status: "approved", duplicateFlag: false } : g));
  const handleBatchApprove = (ids) => setGigs(prev => prev.map(g => ids.includes(g.id) ? { ...g, status: "approved", duplicateFlag: false } : g));
  const handleReject = (id) => setGigs(prev => prev.filter(g => g.id !== id));
  const handleDelete = (id) => setGigs(prev => prev.filter(g => g.id !== id));
  const handleMerge = (id) => setGigs(prev => prev.filter(g => g.id !== id));

  const VIEW_TABS = [["today", "Today"], ["weekend", "Next 3 Days"], ["list", "All Shows"], ["calendar", "Calendar"]];

  return (
    <div style={{ minHeight: "100vh", background: "#0f0900", backgroundImage: "radial-gradient(ellipse at 20% 50%,rgba(255,107,53,0.07) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(255,200,80,0.05) 0%,transparent 50%)", color: "#FFF8EE" }}>
      <div style={{ maxWidth: "740px", margin: "0 auto", padding: "0 20px 100px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", padding: "48px 0 32px", position: "relative" }}>
          <a href="https://support.apple.com/guide/iphone/bookmark-favorite-webpages-iph42ab2f3a7/ios#iph4f9a47bbc" target="_blank" rel="noopener noreferrer" style={{
            position: "absolute", top: 0, left: 0,
            fontFamily: "'Courier Prime',monospace", fontSize: "10px", letterSpacing: "0.08em",
            textTransform: "uppercase", color: "#FFC850", textDecoration: "none",
            border: "1px solid #FFC850", borderRadius: "2px",
            padding: "6px 10px", display: "flex", alignItems: "center", gap: "5px",
            transition: "all 0.15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,200,80,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            🍎 Add to iPhone
          </a>
          <a href="https://support.google.com/chrome/answer/9658361" target="_blank" rel="noopener noreferrer" style={{
            position: "absolute", top: 0, right: 0,
            fontFamily: "'Courier Prime',monospace", fontSize: "10px", letterSpacing: "0.08em",
            textTransform: "uppercase", color: "#FFC850", textDecoration: "none",
            border: "1px solid #FFC850", borderRadius: "2px",
            padding: "6px 10px", display: "flex", alignItems: "center", gap: "5px",
            transition: "all 0.15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,200,80,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            🤖 Add to Android
          </a>
          <div onClick={handleSecretTap} style={{ fontFamily: "'Courier Prime',monospace", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#FF6B35", marginBottom: "10px", cursor: "default", userSelect: "none" }}>◈ Northern Michigan ◈</div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(36px,8vw,56px)", fontWeight: "900", lineHeight: 1, color: "#FFF8EE", letterSpacing: "-0.01em" }}>On Stage</div>
          <div style={{ fontFamily: "'Lora',serif", fontSize: "14px", color: "#777", fontStyle: "italic", marginTop: "8px" }}>Local music. Real venues. Northern Michigan.</div>
        </div>

        {/* Coming soon for all non-music sections */}
        {section !== "music" && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: "52px", marginBottom: "20px" }}>
              {SECTIONS.find(s => s.id === section)?.icon}
            </div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "28px", color: "#FFF8EE", marginBottom: "24px" }}>
              {SECTIONS.find(s => s.id === section)?.label}
            </div>
            <div style={{
              display: "inline-block",
              border: "1px dashed rgba(255,200,80,0.3)",
              borderRadius: "4px",
              padding: "20px 32px",
              background: "rgba(255,200,80,0.04)",
            }}>
              <div style={{ fontFamily: "'Courier Prime',monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#FFC850", marginBottom: "10px" }}>Coming Soon</div>
              <div style={{ fontFamily: "'Lora',serif", fontSize: "14px", color: "#666", fontStyle: "italic", lineHeight: 1.7 }}>
                We're building this out for Northern Michigan.<br />Know about {SECTIONS.find(s => s.id === section)?.label.toLowerCase()} events around here?
              </div>

            </div>
          </div>
        )}

        {/* Main nav */}
        {section === "music" && <div style={{ display: "flex", marginBottom: "28px", borderBottom: "1px solid rgba(255,200,80,0.12)" }}>
          {[["board","Shows"], ["submit","Post a Show"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ background: "transparent", border: "none", borderBottom: tab === id ? "2px solid #FFC850" : "2px solid transparent", color: tab === id ? "#FFC850" : "#555", fontFamily: "'Courier Prime',monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "10px 20px", cursor: "pointer", marginBottom: "-1px" }}>{label}</button>
          ))}
          {tab === "admin" && (
            <button onClick={() => setTab("admin")} style={{ background: "transparent", border: "none", borderBottom: "2px solid #FF6B35", color: "#FF6B35", fontFamily: "'Courier Prime',monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "10px 20px", cursor: "pointer", marginBottom: "-1px" }}>Admin{pendingCount > 0 ? ` (${pendingCount})` : ""}</button>
          )}
        </div>}

        {/* Board */}
        {section === "music" && tab === "board" && (
          <div>
            {/* Sub-nav */}
            <div style={{ display: "flex", gap: "6px", marginBottom: "24px" }}>
              {VIEW_TABS.map(([id, label]) => (
                <button key={id} onClick={() => setBoardView(id)} style={{ background: boardView === id ? "rgba(255,200,80,0.12)" : "transparent", border: `1px solid ${boardView === id ? "#FFC850" : "rgba(255,255,255,0.1)"}`, borderRadius: "2px", color: boardView === id ? "#FFC850" : "#555", fontFamily: "'Courier Prime',monospace", fontSize: "11px", letterSpacing: "0.07em", textTransform: "uppercase", padding: "7px 14px", cursor: "pointer", transition: "all 0.15s" }}>{label}</button>
              ))}
            </div>
            {boardView === "today" && <TodayView gigs={approved} />}
            {boardView === "weekend" && <WeekendView gigs={approved} />}
            {boardView === "list" && <ListView gigs={approved} />}
            {boardView === "calendar" && <CalendarView gigs={approved} />}
            <div style={{ marginTop: "40px", textAlign: "center", fontFamily: "'Courier Prime',monospace", fontSize: "10px", color: "#333" }}>
              Playing a show?{" "}
              <button onClick={() => setTab("submit")} style={{ background: "none", border: "none", color: "#FFC850", fontFamily: "'Courier Prime',monospace", fontSize: "10px", cursor: "pointer", textDecoration: "underline" }}>Post it here →</button>
            </div>
          </div>
        )}

        {/* Submit */}
        {section === "music" && tab === "submit" && (
          <div>
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "22px", color: "#FFF8EE", marginBottom: "6px" }}>Post Your Shows</div>
              <div style={{ fontFamily: "'Lora',serif", fontSize: "14px", color: "#666", lineHeight: 1.6 }}>Add one show or your whole summer. Use "+ Copy Event" to duplicate a show and just change the date.</div>
            </div>
            <SubmitForm onSubmit={handleSubmit} />
          </div>
        )}

        {/* Admin */}
        {section === "music" && tab === "admin" && (
          <div>
            {!adminUnlocked ? (
              <div style={{ maxWidth: "300px", margin: "0 auto", paddingTop: "20px" }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "20px", color: "#FFF8EE", marginBottom: "20px", textAlign: "center" }}>Admin Access</div>
                <input type="password" placeholder="Password" value={adminPass}
                  onChange={e => { setAdminPass(e.target.value); setAdminError(false); }}
                  onKeyDown={e => { if (e.key === "Enter") { if (adminPass === ADMIN_PASSWORD) setAdminUnlocked(true); else setAdminError(true); } }}
                  style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.05)", border: `1px solid ${adminError ? "#FF6B35" : "rgba(255,200,80,0.22)"}`, borderRadius: "2px", color: "#FFF8EE", fontFamily: "'Lora',serif", fontSize: "15px", padding: "12px 14px", outline: "none", marginBottom: "10px" }}
                />
                {adminError && <div style={{ fontFamily: "'Courier Prime',monospace", fontSize: "11px", color: "#FF6B35", marginBottom: "8px" }}>Incorrect password.</div>}
                <button onClick={() => { if (adminPass === ADMIN_PASSWORD) setAdminUnlocked(true); else setAdminError(true); }} style={{ width: "100%", background: "linear-gradient(135deg,#FFC850,#FF6B35)", border: "none", borderRadius: "2px", color: "#1a0e00", fontFamily: "'Courier Prime',monospace", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", fontSize: "13px", padding: "12px", cursor: "pointer" }}>Enter →</button>

              </div>
            ) : (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "22px", color: "#FFF8EE" }}>Admin Panel</div>
                  <button onClick={() => { setAdminUnlocked(false); setAdminPass(""); }} style={{ background: "transparent", border: "1px solid #222", borderRadius: "2px", color: "#555", fontFamily: "'Courier Prime',monospace", fontSize: "10px", padding: "6px 12px", cursor: "pointer" }}>Lock</button>
                </div>
                <AdminPanel gigs={gigs} onApprove={handleApprove} onReject={handleReject} onDelete={handleDelete} onMerge={handleMerge} onBatchApprove={handleBatchApprove} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "rgba(10,6,0,0.97)",
        borderTop: "1px solid rgba(255,200,80,0.15)",
        display: "flex", justifyContent: "space-around", alignItems: "center",
        padding: "8px 0 12px",
        zIndex: 1000,
        backdropFilter: "blur(12px)",
      }}>
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => { setSection(s.id); if (s.id === "music") {} }} style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "3px",
            padding: "4px 12px", transition: "opacity 0.15s",
            opacity: section === s.id ? 1 : 0.4,
          }}>
            <span style={{ fontSize: "22px", lineHeight: 1 }}>{s.icon}</span>
            <span style={{
              fontFamily: "'Courier Prime',monospace", fontSize: "9px",
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: section === s.id ? "#FFC850" : "#666",
            }}>{s.label}</span>
            {section === s.id && (
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#FFC850", marginTop: "1px" }} />
            )}
          </button>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Lora:ital,wght@0,400;1,400&family=Courier+Prime:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator { filter: invert(0.5); cursor: pointer; }
        input.date-input { height: 42px !important; min-height: unset !important; padding-top: 0 !important; padding-bottom: 0 !important; line-height: 42px !important; }
        select { height: 42px !important; }
        select option { background: #1a0e00; color: #FFF8EE; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0f0900; }
        ::-webkit-scrollbar-thumb { background: #2a1f00; border-radius: 3px; }
      `}</style>
    </div>
  );
}
