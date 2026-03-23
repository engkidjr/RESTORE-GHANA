import { NextResponse } from 'next/server';

// Dialogue Tree Database
const DIALOGUE_TREE: Record<string, string> = {
  "0": `Welcome to RestoreGhana. Please select an option by replying with a number:
1. Report Galamsey (Illegal Mining)
2. Report Water Pollution
3. Report Deforestation
4. Learn about our Mission (SDGs)
5. Contact Support / Speak to an Agent`,
  "1": "Galamsey Reporting. Select issue: 11. Active Mining (Excavators present) 12. Abandoned Pits (Danger) 13. River Dredging 0. Main Menu",
  "11": "Active Mining. Select region: 111. Ashanti 112. Western 113. Eastern 0. Main Menu",
  "12": "Abandoned Pits. Are they filled with water? 121. Yes 122. No 0. Main Menu",
  "13": "River Dredging. Select river: 131. Pra 132. Ankobra 133. Birim 0. Main Menu",
  "111": "Report logged for Ashanti Region Galamsey. Taskforce alerted. Reply 0 for Main Menu.",
  "112": "Report logged for Western Region Galamsey. Taskforce alerted. Reply 0 for Main Menu.",
  "113": "Report logged for Eastern Region Galamsey. Taskforce alerted. Reply 0 for Main Menu.",
  "121": "High Risk Pit Logged. Warning sent to local NADMO office. Reply 0 for Main Menu.",
  "122": "Dry Pit Logged for land reclamation. Reply 0 for Main Menu.",
  "131": "Pra River dredging reported to Water Resources Commission. Reply 0 for Main Menu.",
  "132": "Ankobra River dredging reported to Water Resources Commission. Reply 0 for Main Menu.",
  "133": "Birim River dredging reported to Water Resources Commission. Reply 0 for Main Menu.",
  "2": "Water Pollution Reporting. Select observation: 21. Heavy Mud/Turbidity 22. Chemical Smell/Oil Spill 23. Dead Fish spotted 0. Main Menu",
  "21": "Turbidity reported. Is this a drinking water source? 211. Yes 212. No 0. Main Menu",
  "22": "Chemical pollution. Select source if known: 221. Factory discharge 222. Mining chemicals 223. Unknown 0. Main Menu",
  "23": "Dead fish reported. EPA emergency response activated. Reply 0 for Main Menu.",
  "211": "CRITICAL: Ghana Water Company alerted for immediate testing. Reply 0 for Main Menu.",
  "212": "Report logged for environmental tracking. Reply 0 for Main Menu.",
  "221": "Factory discharge reported to EPA. Reply 0 for Main Menu.",
  "222": "Mining chemical spill reported to Minerals Commission. Reply 0 for Main Menu.",
  "223": "Unknown chemical spill logged for EPA investigation. Reply 0 for Main Menu.",
  "3": "Deforestation Reporting. Select issue: 31. Active Logging 32. Commercial Charcoal Burning 33. Bushfires 0. Main Menu",
  "31": "Active Logging. Is it inside a Forest Reserve? 311. Yes 312. No 313. Unsure 0. Main Menu",
  "32": "Charcoal Burning. Select scale: 321. Small scale 322. Massive/Industrial scale 0. Main Menu",
  "33": "Bushfire. Is it threatening homes? 331. Yes (Call Ghana Fire Service immediately on 192!) 332. No 0. Main Menu",
  "311": "Forestry Commission rapid response unit alerted. Reply 0 for Main Menu.",
  "312": "Off-reserve logging reported. Reply 0 for Main Menu.",
  "313": "Coordinates saved for satellite verification. Reply 0 for Main Menu.",
  "321": "Small scale burning logged for community education outreach. Reply 0 for Main Menu.",
  "322": "Industrial scale burning reported to Forestry Commission. Reply 0 for Main Menu.",
  "331": "Please hang up and dial 192 immediately. Reply 0 for Main Menu.",
  "332": "Wildfire mapped. Fire Service notified for monitoring. Reply 0 for Main Menu.",
  "4": "RestoreGhana Education. Select topic: 41. What is Galamsey? 42. How to purify water 43. Tree planting initiatives 44. View our UN SDGs 0. Main Menu",
  "41": "Galamsey is illegal artisanal gold mining that destroys arable land and pollutes water bodies with mercury. Reply 0 for Main Menu.",
  "42": "For muddy water, let it settle, filter through clean cloth, and boil for at least 1 minute. Reply 0 for Main Menu.",
  "43": "We run community tree planting drives every first Saturday of the month. Reply 0 for Main Menu.",
  "44": "RestoreGhana supports SDG 6 (Clean Water), SDG 13 (Climate Action), and SDG 15 (Life on Land). Reply 0 for Main Menu.",
  "5": "Support Menu. Select option: 51. Check Report Status 52. Request Human Callback 53. Partner with us 0. Main Menu",
  "51": "Please enter your 4-digit report tracking ID. (Note: System currently offline, reply 0 for Main Menu).",
  "52": "A RestoreGhana agent will call the number associated with this account within 24 hours. Reply 0 for Main Menu.",
  "53": "To partner with us, email partners@restoreghana.org. Reply 0 for Main Menu.",
};

const INVALID_RESPONSE = `Invalid selection. Please reply with a valid number from the menu. If you need human assistance, contact RestoreGhana Support at 0800-RESTORE (Toll-Free). Reply 0 for Main Menu.`;
const IMAGE_RESPONSE = `Image received. We cannot process images via this menu. Please reply 1, 2, or 3 to categorize your report manually. Reply 0 for Main Menu.`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages || [];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid or empty messages array." }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    const input = (lastMessage.content || "").trim().toLowerCase();

    // Image handling
    if (lastMessage.image) {
      return NextResponse.json({ message: IMAGE_RESPONSE });
    }

    // Main Menu Triggers
    const mainGreetings = ["hi", "hello", "menu", "0"];
    if (mainGreetings.includes(input)) {
      return NextResponse.json({ message: DIALOGUE_TREE["0"] });
    }

    // Dialogue Tree Lookup
    if (DIALOGUE_TREE[input]) {
      return NextResponse.json({ message: DIALOGUE_TREE[input] });
    }

    // Numeric check for invalid selection
    return NextResponse.json({ message: INVALID_RESPONSE });

  } catch (error) {
    console.error("Gibby API Error:", error);
    return NextResponse.json({ error: "Failed to process request." }, { status: 500 });
  }
}