import os
search_words = [
# "😄 OR 😃 OR 😀 OR 😊 OR 😉 OR 😍 OR 😘 OR 😚 OR 😗 OR 😙 OR 😜 OR 😝 OR 😛 OR 😳 OR 😁 OR 😔 OR 😌 OR 😒 OR 😞 OR 😣 OR 😢 OR 😂 OR 😭 OR 😪 OR 😥 OR 😰 OR 😅 OR 😓 OR 😩 OR 😫 OR 😨 OR 😱",
# "😠 OR 😡 OR 😤 OR 😖 OR 😆 OR 😋 OR 😷 OR 😎 OR 😴 OR 😵 OR 😲 OR 😟 OR 😦 OR 😧 OR 😈 OR 👿 OR 😮 OR 😬 OR 😐 OR 😕 OR 😯 OR 😶 OR 😇 OR 😏 OR 😑 OR 👲 OR 👳 OR 👮 OR 👷 OR 💂 OR 👶 OR 👦 OR 👧 OR 👨 OR 👩 OR 👴 OR 👵 OR 👱 OR 👼 OR 👸 OR 😺 OR 😸 OR 😻 OR 😽 OR 😼 OR 🙀 OR 😿 OR 😹 ",
"😾 OR 👹 OR 👺 OR 🙈 OR 🙉 OR 🙊 OR 💀 OR 👽 OR 💩 OR 🔥 OR ✨ OR 🌟 OR 💫 OR 💥 OR 💢 OR 💦 OR 💧 OR 💤 OR 💨 OR 👂 OR 👀 OR 👃 OR 👅 OR 👄 OR 👍 OR 👎 OR 👌 OR 👊 OR ✊ OR ✌ OR 👋 OR ✋ OR 👐 OR 👆 OR 👇",
"👉 OR 👈 OR 🙌 OR 🙏 OR ☝ OR 👏 OR 💪 OR 🚶 OR 🏃 OR 💃 OR 👫 OR 👪 OR 👬 OR 👭 OR 💏 OR 💑 OR 👯 OR 🙆 OR 🙅 OR 💁 OR 🙋 OR 💆 OR 💇 OR 💅 OR 👰 OR 🙎 OR 🙍 OR 🙇 OR 🎩 OR 👑 OR 👒 OR 👟 OR 👞 OR 👡 OR 👠 OR 👢 OR 👕 OR 👔 OR 👚 OR 👗 OR 🎽 OR 👖 OR 👘 OR 👙 OR 💼 OR 👜 OR 👝 OR 👛",
"👓 OR 🎀 OR 🌂 OR 💄 OR 💛 OR 💙 OR 💜 OR 💚 OR ❤ OR 💔 OR 💗 OR 💓 OR 💕 OR 💖 OR 💞 OR 💘 OR 💌 OR 💋 OR 💍 OR 💎 OR 👤 OR 👥 OR 💬 OR 👣 OR 💭 OR 🐶 OR 🐺 OR 🐱 OR 🐭 OR 🐹 OR 🐰 OR 🐸 OR 🐯 OR 🐨 OR 🐻",
"🐷 OR 🐽 OR 🐮 OR 🐗 OR 🐵 OR 🐒 OR 🐴 OR 🐑 OR 🐘 OR 🐼 OR 🐧 OR 🐦 OR 🐤 OR 🐥 OR 🐣 OR 🐔 OR 🐍 OR 🐢 OR 🐛 OR 🐝 OR 🐜 OR 🐞 OR 🐌 OR 🐙 OR 🐚 OR 🐠 OR 🐟 OR 🐬 OR 🐳 OR 🐋 OR 🐄 OR 🐏 OR 🐀 OR 🐃 OR 🐅 OR 🐇 OR 🐉 OR 🐎 OR 🐐 OR 🐓 OR 🐕 OR 🐖 OR 🐁 OR 🐂 OR 🐲 OR 🐡 OR 🐊 OR 🐫",
"🐪 OR 🐆 OR 🐈 OR 🐩 OR 🐾 OR 💐 OR 🌸 OR 🌷 OR 🍀 OR 🌹 OR 🌻 OR 🌺 OR 🍁 OR 🍃 OR 🍂 OR 🌿 OR 🌾 OR 🍄 OR 🌵 OR 🌴 OR 🌲 OR 🌳 OR 🌰 OR 🌱 OR 🌼 OR 🌐 OR 🌞 OR 🌝 OR 🌚 OR 🌑 OR 🌒 OR 🌓 OR 🌔 OR 🌕 OR 🌖",
"🌗 OR 🌘 OR 🌜 OR 🌛 OR 🌙 OR 🌍 OR 🌎 OR 🌏 OR 🌋 OR 🌌 OR 🌠 OR ⭐ OR ☀ OR ⛅ OR ☁ OR ⚡ OR ☔ OR ❄ OR ⛄ OR 🌀 OR 🌁 OR 🌈 OR 🌊 OR 🎍 OR 💝 OR 🎎 OR 🎒 OR 🎓 OR 🎏 OR 🎆 OR 🎇 OR 🎐 OR 🎑 OR 🎃 OR 👻 OR 🎅 OR 🎄 OR 🎁 OR 🎋 OR 🎉 OR 🎊 OR 🎈 OR 🎌 OR 🔮 OR 🎥 OR 📷 OR 📹 OR 📼 OR 💿",
"📀 OR 💽 OR 💾 OR 💻 OR 📱 OR ☎ OR 📞 OR 📟 OR 📠 OR 📡 OR 📺 OR 📻 OR 🔊 OR 🔉 OR 🔈 OR 🔇 OR 🔔 OR 🔕 OR 📢 OR 📣 OR ⏳ OR ⌛ OR ⏰ OR ⌚ OR 🔓 OR 🔒 OR 🔏 OR 🔐 OR 🔑 OR 🔎 OR 💡 OR 🔦 OR 🔆 OR 🔅 OR 🔌",
"🔋 OR 🔍 OR 🛁 OR 🛀 OR 🚿 OR 🚽 OR 🔧 OR 🔩 OR 🔨 OR 🚪 OR 🚬 OR 💣 OR 🔫 OR 🔪 OR 💊 OR 💉 OR 💰 OR 💴 OR 💵 OR 💷 OR 💶 OR 💳 OR 💸 OR 📲 OR 📧 OR 📥 OR 📤 OR ✉ OR 📩 OR 📨 OR 📯 OR 📫 OR 📪 OR 📬 OR 📭 OR 📮 OR 📦 OR 📝 OR 📄 OR 📃 OR 📑 OR 📊 OR 📈 OR 📉 OR 📜 OR 📋 OR 📅 OR 📆 OR 📇",
"📁 OR 📂 OR ✂ OR 📌 OR 📎 OR ✒ OR ✏ OR 📏 OR 📐 OR 📕 OR 📗 OR 📘 OR 📙 OR 📓 OR 📔 OR 📒 OR 📚 OR 📖 OR 🔖 OR 📛 OR 🔬 OR 🔭 OR 📰 OR 🎨 OR 🎬 OR 🎤 OR 🎧 OR 🎼 OR 🎵 OR 🎶 OR 🎹 OR 🎻 OR 🎺 OR 🎷 OR 🎸",
"👾 OR 🎮 OR 🃏 OR 🎴 OR 🀄 OR 🎲 OR 🎯 OR 🏈 OR 🏀 OR ⚽ OR ⚾ OR 🎾 OR 🎱 OR 🏉 OR 🎳 OR ⛳ OR 🚵 OR 🚴 OR 🏁 OR 🏇 OR 🏆 OR 🎿 OR 🏂 OR 🏊 OR 🏄 OR 🎣 OR ☕ OR 🍵 OR 🍶 OR 🍼 OR 🍺 OR 🍻 OR 🍸 OR 🍹 OR 🍷 OR 🍴 OR 🍕 OR 🍔 OR 🍟 OR 🍗 OR 🍖 OR 🍝 OR 🍛 OR 🍤 OR 🍱 OR 🍣 OR 🍥 OR 🍙 OR 🍘",
"🍚 OR 🍜 OR 🍲 OR 🍢 OR 🍡 OR 🍳 OR 🍞 OR 🍩 OR 🍮 OR 🍦 OR 🍨 OR 🍧 OR 🎂 OR 🍰 OR 🍪 OR 🍫 OR 🍬 OR 🍭 OR 🍯 OR 🍎 OR 🍏 OR 🍊 OR 🍋 OR 🍒 OR 🍇 OR 🍉 OR 🍓 OR 🍑 OR 🍈 OR 🍌 OR 🍐 OR 🍍 OR 🍠 OR 🍆 OR 🍅",
"🌽 OR 🏠 OR 🏡 OR 🏫 OR 🏢 OR 🏣 OR 🏥 OR 🏦 OR 🏪 OR 🏩 OR 🏨 OR 💒 OR ⛪ OR 🏬 OR 🏤 OR 🌇 OR 🌆 OR 🏯 OR 🏰 OR ⛺ OR 🏭 OR 🗼 OR 🗾 OR 🗻 OR 🌄 OR 🌅 OR 🌃 OR 🗽 OR 🌉 OR 🎠 OR 🎡 OR ⛲ OR 🎢 OR 🚢 OR ⛵ OR 🚤 OR 🚣 OR ⚓ OR 🚀 OR ✈ OR 💺 OR 🚁 OR 🚂 OR 🚊 OR 🚉 OR 🚞 OR 🚆 OR 🚄 OR 🚅",
"🚈 OR 🚇 OR 🚝 OR 🚋 OR 🚃 OR 🚎 OR 🚌 OR 🚍 OR 🚙 OR 🚘 OR 🚗 OR 🚕 OR 🚖 OR 🚛 OR 🚚 OR 🚨 OR 🚓 OR 🚔 OR 🚒 OR 🚑 OR 🚐 OR 🚲 OR 🚡 OR 🚟 OR 🚠 OR 🚜 OR 💈 OR 🚏 OR 🎫 OR 🚦 OR 🚥 OR ⚠ OR 🚧 OR 🔰 OR ⛽",
# "🏮 OR 🎰 OR ♨ OR 🗿 OR 🎪 OR 🎭 OR 📍 OR 🚩 OR 🇯🇵 OR 🇰🇷 OR 🇩🇪 OR 🇨🇳 OR 🇺🇸 OR 🇫🇷 OR 🇪🇸 OR 🇮🇹 OR 🇷🇺 OR 🇬🇧 OR 1⃣ OR 2⃣ OR 3⃣ OR 4⃣ OR 5⃣ OR 6⃣ OR 7⃣ OR 8⃣ OR 9⃣ OR 0⃣ OR 🔟 OR 🔢 OR 🔣 OR ⬆ OR ⬇ OR ⬅ OR ➡ OR 🔠 OR 🔡 OR 🔤 OR ↗ OR ↖ OR ↘ OR ↙ OR ↔ OR ↕ OR 🔄 OR ◀ OR ▶ OR 🔼 OR 🔽 OR ↩ OR ↪ OR ℹ ",
"⏪ OR ⏩ OR ⏫ OR ⏬ OR ⤵ OR ⤴ OR 🆗 OR 🔀 OR 🔁 OR 🔂 OR 🆕 OR 🆙 OR 🆒 OR 🆓 OR 🆖 OR 📶 OR 🎦 OR 🈁 OR 🈯 OR 🈳 OR 🈵 OR 🈴 OR 🈲 OR 🉐 OR 🈹 OR 🈺 OR 🈶 OR 🈚 OR 🚻 OR 🚹 OR 🚺 OR 🚼 OR 🚾 OR 🚰 OR 🚮",
"🅿 OR ♿ OR 🚭 OR 🈷 OR 🈸 OR 🈂 OR Ⓜ OR 🛂 OR 🛄 OR 🛅 OR 🛃 OR 🉑 OR ㊙ OR ㊗ OR 🆑 OR 🆘 OR 🆔 OR 🚫 OR 🔞 OR 📵 OR 🚯 OR 🚱 OR 🚳 OR 🚷 OR 🚸 OR ⛔ OR ✳ OR ❇ OR ❎ OR ✅ OR ✴ OR 💟 OR 🆚 OR 📳 OR 📴 OR 🅰 OR 🅱 OR 🆎 OR 🅾 OR 💠 OR ➿ OR ♻ OR ♈ OR ♉ OR ♊ OR ♋ OR ♌ OR ♍ OR ♎ OR ♏ OR ♐ OR ♑",
"♒ OR ♓ OR ⛎ OR 🔯 OR 🏧 OR 💹 OR 💲 OR 💱 OR © OR ® OR ™ OR ❌ OR ‼ OR ⁉ OR ❗ OR ❓ OR ❕ OR ❔ OR ⭕ OR 🔝 OR 🔚 OR 🔙 OR 🔛 OR 🔜 OR 🔃 OR 🕛 OR 🕧 OR 🕐 OR 🕜 OR 🕑 OR 🕝 OR 🕒 OR 🕞 OR 🕓 OR 🕟",
"🕔 OR 🕠 OR 🕕 OR 🕖 OR 🕗 OR 🕘 OR 🕙 OR 🕚 OR 🕡 OR 🕢 OR 🕣 OR 🕤 OR 🕥 OR 🕦 OR ✖ OR ➕ OR ➖ OR ➗ OR ♠ OR ♥ OR ♣ OR ♦ OR 💮 OR 💯 OR ✔ OR ☑ OR 🔘 OR 🔗 OR ➰ OR 〰 OR 〽 OR 🔱 OR ◼ OR ◻ OR ◾ OR ◽ OR ▪ OR ▫ OR 🔺 OR 🔲 OR 🔳 OR ⚫ OR ⚪ OR 🔴 OR 🔵 OR 🔻 OR ⬜ OR ⬛ OR 🔶 OR 🔷 OR 🔸 OR 🔹",
]
count = 0
for search_word in search_words:
    print(search_word)
    os.system('python3 Exporter.py --querysearch "{}" --maxtweets 100000 --output={} --since 2010-01-01 --until 2019-01-01'.format(search_word+ " 😠", str(count)+'.csv'))
    count+=1

#python3 Exporter.py --lang "en" --querysearch "🎅" --maxtweets 1000000 --output=santa.csv --since 2010-01-01 --until 2019-10-01