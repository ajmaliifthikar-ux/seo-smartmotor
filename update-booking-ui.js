const fs = require('fs');

const path = './src/components/v2/sections/booking-form.tsx';
let content = fs.readFileSync(path, 'utf8');

// Container
content = content.replace(
    /className="bg-white\/5 backdrop-blur-xl border border-white\/10 rounded-\[2\.5rem\] p-6 md:p-10 shadow-2xl"/g,
    'className="bg-[#0a0a0a] carbon-fiber border border-white/10 rounded-[2.5rem] p-6 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative"'
);

// Step 1: Front Card
content = content.replace(
    /className="absolute inset-0 backface-hidden bg-\[#1a1a1a\] rounded-3xl border border-white\/10 p-8 flex flex-col items-center justify-center text-center shadow-xl hover:border-\[#E62329\]\/50 transition-colors group"/g,
    'className="absolute inset-0 backface-hidden bg-[#121212] carbon-fiber rounded-3xl border border-white/10 p-8 flex flex-col items-center justify-center text-center shadow-2xl hover:border-[#E62329]/50 transition-all group overflow-hidden"\n                            >\n                                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />'
);

// Step 1: Back Card
content = content.replace(
    /className="absolute inset-0 backface-hidden rotate-y-180 bg-\[#121212\] rounded-3xl border border-\[#E62329\]\/30 p-6 flex flex-col shadow-2xl overflow-hidden"/g,
    'className="absolute inset-0 backface-hidden rotate-y-180 bg-[#0a0a0a] carbon-fiber rounded-3xl border border-[#E62329]/50 p-6 flex flex-col shadow-[0_0_30px_rgba(230,35,41,0.15)] overflow-hidden"'
);

// Step 1: Service Items Selection
content = content.replace(
    /\? "bg-\[#E62329\]\/10 border-\[#E62329\] text-white"/g,
    '? "bg-gradient-to-r from-[#E62329] to-[#a01418] border-transparent text-white shadow-lg shadow-[#E62329]/20"'
);
content = content.replace(
    /: "bg-white\/5 border-transparent text-gray-300 hover:bg-white\/10"/g,
    ': "bg-[#121212] border-white/10 text-gray-300 hover:border-white/30"'
);

// Step 2: Brand Grid
content = content.replace(
    /className="aspect-square bg-\[#1a1a1a\] border border-white\/5 rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer hover:border-\[#E62329\]\/50 hover:bg-white\/5 transition-all group"/g,
    'className="aspect-square bg-[#121212] carbon-fiber border border-white/5 rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer hover:border-[#E62329]/50 hover:shadow-[0_0_20px_rgba(230,35,41,0.1)] transition-all group"'
);

// Step 2: Expanded Brand
content = content.replace(
    /className="bg-\[#1a1a1a\] border border-white\/10 rounded-3xl p-6 md:p-8 relative overflow-hidden"/g,
    'className="bg-[#121212] carbon-fiber border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl"'
);

// Step 2: Model Item Selected/Unselected
content = content.replace(
    /\? "bg-\[#E62329\]\/10 border-\[#E62329\] text-white"/g,
    '? "bg-gradient-to-r from-[#E62329] to-[#a01418] border-transparent text-white shadow-lg shadow-[#E62329]/20"'
);
content = content.replace(
    /: "bg-\[#121212\] border-white\/5 text-gray-400 hover:text-white hover:border-white\/20"/g,
    ': "bg-[#0a0a0a] border border-white/10 text-gray-400 hover:text-white hover:border-white/30 hover:bg-[#121212]"'
);

// Step 2: Year Dropdown
content = content.replace(
    /className="w-full bg-\[#121212\] border border-\[#E62329\]\/30 text-white rounded-xl p-3 outline-none font-medium appearance-none"/g,
    'className="w-full bg-[#0a0a0a] border border-[#E62329]/50 focus:ring-1 focus:ring-[#E62329] text-white rounded-xl p-3 outline-none font-medium appearance-none shadow-inner transition-all"'
);

// Step 3: Date Pills
content = content.replace(
    /\? "bg-white text-black border-transparent shadow-lg shadow-white\/10"/g,
    '? "bg-gradient-to-b from-[#E62329] to-[#a01418] text-white border-transparent shadow-[0_8px_16px_rgba(230,35,41,0.3)]"'
);
content = content.replace(
    /: "bg-\[#1a1a1a\] text-gray-400 border-white\/5 hover:bg-white\/5"/g,
    ': "bg-[#121212] carbon-fiber text-gray-400 border border-white/10 hover:border-white/30"'
);

// Step 3: Time Pills
content = content.replace(
    /\? "bg-\[#E62329\] text-white border-\[#E62329\] shadow-lg shadow-\[#E62329\]\/20"/g,
    '? "bg-gradient-to-b from-[#E62329] to-[#a01418] text-white border-transparent shadow-[0_8px_16px_rgba(230,35,41,0.3)]"'
);
content = content.replace(
    /: "bg-\[#1a1a1a\] text-gray-300 border-white\/5 hover:bg-white\/10"/g,
    ': "bg-[#121212] carbon-fiber text-gray-300 border border-white/10 hover:border-white/30"'
);

// Step 4: Form Inputs
content = content.replace(
    /className="h-14 bg-\[#1a1a1a\] border-white\/10 text-white rounded-2xl focus:border-\[#E62329\]"/g,
    'className="h-14 bg-[#0a0a0a] border border-white/10 text-white rounded-2xl focus:border-[#E62329] focus:ring-1 focus:ring-[#E62329]/50 transition-all shadow-inner"'
);
content = content.replace(
    /className="bg-\[#1a1a1a\] border-white\/10 text-white rounded-2xl focus:border-\[#E62329\] min-h-\[100px\] resize-none"/g,
    'className="bg-[#0a0a0a] border border-white/10 text-white rounded-2xl focus:border-[#E62329] focus:ring-1 focus:ring-[#E62329]/50 transition-all shadow-inner min-h-[100px] resize-none"'
);

// Step 4: Summary Box
content = content.replace(
    /className="bg-\[#1a1a1a\] rounded-3xl border border-white\/10 p-8 h-fit"/g,
    'className="bg-[#121212] carbon-fiber rounded-3xl border border-white/10 p-8 h-fit shadow-2xl relative overflow-hidden" \n            >\n                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />'
);

// Next Button in step 4
content = content.replace(
    /className="bg-white text-black hover:bg-\[#E62329\] hover:text-white font-black text-xs uppercase tracking-widest px-10 h-14 rounded-2xl transition-all shadow-xl button-overlay group\/btn"/g,
    'className="bg-white text-black hover:bg-[#E62329] font-black text-xs uppercase tracking-widest px-10 h-14 rounded-2xl transition-all shadow-xl button-overlay group/btn relative overflow-hidden"'
);

fs.writeFileSync(path, content);
console.log('UI overrides applied');
