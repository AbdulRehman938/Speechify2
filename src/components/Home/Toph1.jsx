import React, { useState, useEffect } from 'react';
import snoopDoggImage from '/src/assets/images/Snoop-large@2x.webp';
import emily from '/src/assets/images/Emily-img.png';

const flagImages = {
    English: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/us.svg',
    Spanish: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/mx.svg',
    French: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/fr.svg',
    German: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/de.svg',
    Portuguese: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/br.svg',
    Chinese: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/cn.svg',
    Italian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/it.svg',
    Tamil: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/in.svg',
    Japanese: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/jp.svg',
    Dutch: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/nl.svg',
    Korean: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/kr.svg',
    Arabic: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/ae.svg',
    Russian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/ru.svg',
    Urdu: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/pk.svg',
    'Norwegian Bokmål': 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/no.svg',
    Polish: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/pl.svg',
    Swedish: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/se.svg',
    Afrikaans: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/za.svg',
    Bulgarian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/bg.svg',
    Bangla: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/bd.svg',
    Catalan: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/es-ct.svg',
    Czech: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/cz.svg',
    Danish: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/dk.svg',
    Greek: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/gr.svg',
    Estonian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/ee.svg',
    Persian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/ir.svg',
    Finnish: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/fi.svg',
    Filipino: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/ph.svg',
    Irish: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/ie.svg',
    Hebrew: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/il.svg',
    Hindi: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/in.svg',
    Croatian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/hr.svg',
    Hungarian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/hu.svg',
    Indonesian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/id.svg',
    Icelandic: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/is.svg',
    Georgian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/ge.svg',
    Kazakh: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/kz.svg',
    Lithuanian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/lt.svg',
    Latvian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/lv.svg',
    Malay: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/my.svg',
    Nepali: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/np.svg',
    Romanian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/ro.svg',
    Sinhala: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/lk.svg',
    Slovak: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/sk.svg',
    Slovenian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/si.svg',
    Swahili: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/tz.svg',
    Telugu: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/in.svg',
    Thai: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/th.svg',
    Turkish: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/tr.svg',
    Ukrainian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/ua.svg',
    Vietnamese: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/vn.svg',
    Cantonese: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/hk.svg',
};

const languages = [
    { name: "English", flag: flagImages.English },
    { name: "Spanish", flag: flagImages.Spanish },
    { name: "French", flag: flagImages.French },
    { name: "German", flag: flagImages.German },
    { name: "Portuguese", flag: flagImages.Portuguese },
    { name: "Chinese", flag: flagImages.Chinese },
    { name: "Italian", flag: flagImages.Italian },
    { name: "Tamil", flag: flagImages.Tamil },
    { name: "Japanese", flag: flagImages.Japanese },
    { name: "Dutch", flag: flagImages.Dutch },
    { name: "Korean", flag: flagImages.Korean },
    { name: "Arabic", flag: flagImages.Arabic },
    { name: "Russian", flag: flagImages.Russian },
    { name: "Urdu", flag: flagImages.Urdu },
    { name: "Norwegian Bokmål", flag: flagImages['Norwegian Bokmål'] },
    { name: "Polish", flag: flagImages.Polish },
    { name: "Swedish", flag: flagImages.Swedish },
    { name: "Afrikaans", flag: flagImages.Afrikaans },
    { name: "Bulgarian", flag: flagImages.Bulgarian },
    { name: "Bangla", flag: flagImages.Bangla },
    { name: "Catalan", flag: flagImages.Catalan },
    { name: "Czech", flag: flagImages.Czech },
    { name: "Danish", flag: flagImages.Danish },
    { name: "Greek", flag: flagImages.Greek },
    { name: "Estonian", flag: flagImages.Estonian },
    { name: "Persian", flag: flagImages.Persian },
    { name: "Finnish", flag: flagImages.Finnish },
    { name: "Filipino", flag: flagImages.Filipino },
    { name: "Irish", flag: flagImages.Irish },
    { name: "Hebrew", flag: flagImages.Hebrew },
    { name: "Hindi", flag: flagImages.Hindi },
    { name: "Croatian", flag: flagImages.Croatian },
    { name: "Hungarian", flag: flagImages.Hungarian },
    { name: "Indonesian", flag: flagImages.Indonesian },
    { name: "Icelandic", flag: flagImages.Icelandic },
    { name: "Georgian", flag: flagImages.Georgian },
    { name: "Kazakh", flag: flagImages.Kazakh },
    { name: "Lithuanian", flag: flagImages.Lithuanian },
    { name: "Latvian", flag: flagImages.Latvian },
    { name: "Malay", flag: flagImages.Malay },
    { name: "Nepali", flag: flagImages.Nepali },
    { name: "Romanian", flag: flagImages.Romanian },
    { name: "Sinhala", flag: flagImages.Sinhala },
    { name: "Slovak", flag: flagImages.Slovak },
    { name: "Slovenian", flag: flagImages.Slovenian },
    { name: "Swahili", flag: flagImages.Swahili },
    { name: "Telugu", flag: flagImages.Telugu },
    { name: "Thai", flag: flagImages.Thai },
    { name: "Turkish", flag: flagImages.Turkish },
    { name: "Ukrainian", flag: flagImages.Ukrainian },
    { name: "Vietnamese", flag: flagImages.Vietnamese },
    { name: "Cantonese", flag: flagImages.Cantonese },
];

const languageSpeakers = {
    English: [
        { image: emily, name: "Emily", role: "American English" },
        { image: snoopDoggImage, name: "Snoop Dogg", role: "Music icon" }
    ],
    Spanish: [
        { image: "https://randomuser.me/api/portraits/women/44.jpg", name: "Isabella", role: "Spanish Voice" },
        { image: "https://randomuser.me/api/portraits/men/32.jpg", name: "Carlos", role: "Latin American Voice" }
    ],
    French: [
        { image: "https://randomuser.me/api/portraits/women/33.jpg", name: "Sophie", role: "French Voice" },
        { image: "https://randomuser.me/api/portraits/men/22.jpg", name: "Pierre", role: "French Voice" }
    ],
    German: [
        { image: "https://randomuser.me/api/portraits/women/41.jpg", name: "Anna", role: "German Voice" },
        { image: "https://randomuser.me/api/portraits/men/11.jpg", name: "Hans", role: "German Voice" }
    ],
    Portuguese: [
        { image: "https://randomuser.me/api/portraits/women/55.jpg", name: "Beatriz", role: "Brazilian Voice" },
        { image: "https://randomuser.me/api/portraits/men/77.jpg", name: "Pedro", role: "Portuguese Voice" }
    ],
    Chinese: [
        { image: "https://randomuser.me/api/portraits/women/88.jpg", name: "Mei", role: "Mandarin Voice" },
        { image: "https://randomuser.me/api/portraits/men/99.jpg", name: "Wei", role: "Cantonese Voice" }
    ],
    Italian: [
        { image: "https://randomuser.me/api/portraits/women/66.jpg", name: "Sofia", role: "Italian Voice" },
        { image: "https://randomuser.me/api/portraits/men/44.jpg", name: "Marco", role: "Italian Voice" }
    ],
    Japanese: [
        { image: "https://randomuser.me/api/portraits/women/22.jpg", name: "Hana", role: "Japanese Voice" },
        { image: "https://randomuser.me/api/portraits/men/33.jpg", name: "Takeshi", role: "Japanese Voice" }
    ],
    Korean: [
        { image: "https://randomuser.me/api/portraits/women/11.jpg", name: "Ji-eun", role: "Korean Voice" },
        { image: "https://randomuser.me/api/portraits/men/55.jpg", name: "Min-ho", role: "Korean Voice" }
    ],
    Arabic: [
        { image: "https://randomuser.me/api/portraits/women/77.jpg", name: "Layla", role: "Arabic Voice" },
        { image: "https://randomuser.me/api/portraits/men/66.jpg", name: "Omar", role: "Arabic Voice" }
    ],
    Russian: [
        { image: "https://randomuser.me/api/portraits/women/99.jpg", name: "Anastasia", role: "Russian Voice" },
        { image: "https://randomuser.me/api/portraits/men/88.jpg", name: "Dmitri", role: "Russian Voice" }
    ],
    Hindi: [
        { image: "https://randomuser.me/api/portraits/women/12.jpg", name: "Priya", role: "Hindi Voice" },
        { image: "https://randomuser.me/api/portraits/men/13.jpg", name: "Rahul", role: "Hindi Voice" }
    ],
    default: [
        { image: "https://randomuser.me/api/portraits/women/1.jpg", name: "Female Voice", role: "Standard Voice" },
        { image: "https://randomuser.me/api/portraits/men/1.jpg", name: "Male Voice", role: "Standard Voice" }
    ]
};

const translations = {
    "English": {
        "Try Our AI Voices": "Try Our AI Voices",
        "Generate text in": "Generate text in",
        "Cliff Weitzman is the founder of Speechify.": "Cliff Weitzman is the founder of Speechify.",
        "Cliff is also dyslexic.": "Cliff is also dyslexic.",
        "Growing up, Cliff's dad would read him Harry Potter because he couldn't do it himself. Cliff's dad was his hero.": "Growing up, Cliff's dad would read him Harry Potter because he couldn't do it himself. Cliff's dad was his hero.",
        "But without reading, Cliff couldn't become the person he wanted to be. So, he learned to code and created Speechify to read books to himself.": "But without reading, Cliff couldn't become the person he wanted to be. So, he learned to code and created Speechify to read books to himself.",
        "Today, Speechify helps over 50 million people read faster, remember more, and save time.": "Today, Speechify helps over 50 million people read faster, remember more, and save time.",
        "American English": "American English",
        "Music icon": "Music icon",
        "Speechify Founder": "Speechify Founder",
        "Actor": "Actor",
        "Youtuber": "Youtuber",
        "Narrator": "Narrator",
        "Sign In": "Sign In",
        "to explore": "to explore",
        "Female Voice": "Female Voice",
        "Male Voice": "Male Voice",
        "Standard Voice": "Standard Voice",
    },
    "Spanish": {
        "Try Our AI Voices": "Prueba nuestras voces de IA",
        "Generate text in": "Generar texto en",
        "Cliff Weitzman is the founder of Speechify.": "Cliff Weitzman es el fundador de Speechify.",
        "Cliff is also dyslexic.": "Cliff también es disléxico.",
        "Growing up, Cliff's dad would read him Harry Potter because he couldn't do it himself. Cliff's dad was his hero.": "De niño, el papá de Cliff le leía Harry Potter porque él mismo no podía. El papá de Cliff era su héroe.",
        "But without reading, Cliff couldn't become the person he wanted to be. So, he learned to code and created Speechify to read books to himself.": "Pero sin leer, Cliff no podía convertirse en la persona que quería ser. Así que, aprendió a programar y creó Speechify para leerse libros a sí mismo.",
        "Today, Speechify helps over 50 million people read faster, remember more, and save time.": "Hoy, Speechify ayuda a más de 50 millones de personas a leer más rápido, recordar más y ahorrar tiempo.",
        "Spanish Voice": "Voz en español",
        "Latin American Voice": "Voz latinoamericana",
        "Music icon": "Icono musical",
        "Speechify Founder": "Fundador de Speechify",
        "Actor": "Actor",
        "Youtuber": "Youtuber",
        "Narrator": "Narrador",
        "Sign In": "Iniciar sesión",
        "to explore": "para explorar",
        "Female Voice": "Voz femenina",
        "Male Voice": "Voz masculina",
        "Standard Voice": "Voz estándar",
    },
    "French": {
        "Try Our AI Voices": "Essayez nos voix IA",
        "Generate text in": "Générer du texte en",
        "Cliff Weitzman is the founder of Speechify.": "Cliff Weitzman est le fondateur de Speechify.",
        "Cliff is also dyslexic.": "Cliff est également dyslexique.",
        "Growing up, Cliff's dad would read him Harry Potter because he couldn't do it himself. Cliff's dad was his hero.": "En grandissant, le père de Cliff lui lisait Harry Potter parce qu'il ne pouvait pas le faire lui-même. Le père de Cliff était son héros.",
        "But without reading, Cliff couldn't become the person he wanted to be. So, he learned to code and created Speechify to read books to himself.": "Mais sans lire, Cliff ne pouvait pas devenir la personne qu'il voulait être. Alors, il a appris à coder et a créé Speechify pour se lire des livres.",
        "Today, Speechify helps over 50 million people read faster, remember more, and save time.": "Aujourd'hui, Speechify aide plus de 50 millions de personnes à lire plus vite, à mieux mémoriser et à gagner du temps.",
        "French Voice": "Voix française",
        "Music icon": "Icône de la musique",
        "Speechify Founder": "Fondateur de Speechify",
        "Actor": "Acteur",
        "Youtuber": "Youtubeur",
        "Narrator": "Narrateur",
        "Sign In": "Se connecter",
        "to explore": "pour explorer",
        "Female Voice": "Voix féminine",
        "Male Voice": "Voix masculine",
        "Standard Voice": "Voix standard",
    },
    "German": {
        "Try Our AI Voices": "Probieren Sie unsere KI-Stimmen aus",
        "Generate text in": "Text generieren in",
        "Cliff Weitzman is the founder of Speechify.": "Cliff Weitzman ist der Gründer von Speechify.",
        "Cliff is also dyslexic.": "Cliff ist auch Legastheniker.",
        "Growing up, Cliff's dad would read him Harry Potter because he couldn't do it himself. Cliff's dad was his hero.": "Als Kind las Cliffs Vater ihm Harry Potter vor, weil er es selbst nicht konnte. Cliffs Vater war sein Held.",
        "But without reading, Cliff couldn't become the person he wanted to be. So, he learned to code and created Speechify to read books to himself.": "Aber ohne zu lesen konnte Cliff nicht die Person werden, die er sein wollte. Also lernte er zu programmieren und erstellte Speechify, um sich Bücher vorlesen zu lassen.",
        "Today, Speechify helps over 50 million people read faster, remember more, and save time.": "Heute hilft Speechify über 50 Millionen Menschen, schneller zu lesen, sich mehr zu merken und Zeit zu sparen.",
        "German Voice": "Deutsche Stimme",
        "Music icon": "Musik-Ikone",
        "Speechify Founder": "Speechify-Gründer",
        "Actor": "Schauspieler",
        "Youtuber": "Youtuber",
        "Narrator": "Erzähler",
        "Sign In": "Anmelden",
        "to explore": "um zu entdecken",
        "Female Voice": "Weibliche Stimme",
        "Male Voice": "Männliche Stimme",
        "Standard Voice": "Standardstimme",
    },
    // Add translations for other languages as needed.
    // For simplicity, I've only added a few. You'll need to fill in the rest.
    "Portuguese": {
        "Try Our AI Voices": "Experimente nossas vozes de IA",
        "Generate text in": "Gerar texto em",
        "Cliff Weitzman is the founder of Speechify.": "Cliff Weitzman é o fundador da Speechify.",
        "Cliff is also dyslexic.": "Cliff também é disléxico.",
        "Growing up, Cliff's dad would read him Harry Potter because he couldn't do it himself. Cliff's dad was his hero.": "Quando criança, o pai de Cliff lia Harry Potter para ele porque ele não conseguia fazer isso sozinho. O pai de Cliff era seu herói.",
        "But without reading, Cliff couldn't become the person he wanted to be. So, he learned to code and created Speechify to read books to himself.": "Mas sem ler, Cliff não poderia se tornar a pessoa que ele queria ser. Então, ele aprendeu a programar e criou Speechify para ler livros para si mesmo.",
        "Today, Speechify helps over 50 million people read faster, remember more, and save time.": "Hoje, o Speechify ajuda mais de 50 milhões de pessoas a ler mais rápido, lembrar mais e economizar tempo.",
        "Brazilian Voice": "Voz brasileira",
        "Portuguese Voice": "Voz portuguesa",
        "Music icon": "Ícone da música",
        "Speechify Founder": "Fundador da Speechify",
        "Actor": "Ator",
        "Youtuber": "Youtuber",
        "Narrator": "Narrador",
        "Sign In": "Entrar",
        "to explore": "para explorar",
        "Female Voice": "Voz feminina",
        "Male Voice": "Voz masculina",
        "Standard Voice": "Voz padrão",
    },
    "Chinese": {
        "Try Our AI Voices": "试试我们的人工智能声音",
        "Generate text in": "生成文本为",
        "Cliff Weitzman is the founder of Speechify.": "Cliff Weitzman 是 Speechify 的创始人。",
        "Cliff is also dyslexic.": "Cliff 也有阅读障碍。",
        "Growing up, Cliff's dad would read him Harry Potter because he couldn't do it himself. Cliff's dad was his hero.": "在成长过程中，Cliff 的父亲会给他读《哈利·波特》，因为他自己读不了。Cliff 的父亲是他的英雄。",
        "But without reading, Cliff couldn't become the person he wanted to be. So, he learned to code and created Speechify to read books to himself.": "但如果没有阅读，Cliff 就无法成为他想成为的人。于是，他学习了编程，并创建了 Speechify 来给自己朗读书籍。",
        "Today, Speechify helps over 50 million people read faster, remember more, and save time.": "今天，Speechify 帮助超过 5000 万人更快阅读、记住更多并节省时间。",
        "Mandarin Voice": "普通话声音",
        "Cantonese Voice": "粤语声音",
        "Music icon": "音乐偶像",
        "Speechify Founder": "Speechify 创始人",
        "Actor": "演员",
        "Youtuber": "视频博主",
        "Narrator": "旁白",
        "Sign In": "登录",
        "to explore": "去探索",
        "Female Voice": "女声",
        "Male Voice": "男声",
        "Standard Voice": "标准声音",
    },
    "Italian": {
        "Try Our AI Voices": "Prova le nostre voci AI",
        "Generate text in": "Genera testo in",
        "Cliff Weitzman is the founder of Speechify.": "Cliff Weitzman è il fondatore di Speechify.",
        "Cliff is also dyslexic.": "Cliff è anche dislessico.",
        "Growing up, Cliff's dad would read him Harry Potter because he couldn't do it himself. Cliff's dad was his hero.": "Crescendo, il padre di Cliff gli leggeva Harry Potter perché non poteva farlo da solo. Il padre di Cliff era il suo eroe.",
        "But without reading, Cliff couldn't become the person he wanted to be. So, he learned to code and created Speechify to read books to himself.": "Ma senza leggere, Cliff non poteva diventare la persona che voleva essere. Così, ha imparato a programmare e ha creato Speechify per leggersi i libri.",
        "Today, Speechify helps over 50 million people read faster, remember more, and save time.": "Oggi, Speechify aiuta oltre 50 milioni di persone a leggere più velocemente, ricordare di più e risparmiare tempo.",
        "Italian Voice": "Voce italiana",
        "Music icon": "Icona musicale",
        "Speechify Founder": "Fondatore di Speechify",
        "Actor": "Attore",
        "Youtuber": "Youtuber",
        "Narrator": "Narratore",
        "Sign In": "Accedi",
        "to explore": "per esplorare",
        "Female Voice": "Voce femminile",
        "Male Voice": "Voce maschile",
        "Standard Voice": "Voce standard",
    },
    "Japanese": {
        "Try Our AI Voices": "AI音声を試す",
        "Generate text in": "テキストを生成する言語",
        "Cliff Weitzman is the founder of Speechify.": "クリフ・ワイツマンはSpeechifyの創設者です。",
        "Cliff is also dyslexic.": "クリフは識字障害でもあります。",
        "Growing up, Cliff's dad would read him Harry Potter because he couldn't do it himself. Cliff's dad was his hero.": "幼い頃、クリフの父親は彼自身では読むことができなかったので、ハリー・ポッターを読んで聞かせてくれました。クリフの父親は彼のヒーローでした。",
        "But without reading, Cliff couldn't become the person he wanted to be. So, he learned to code and created Speechify to read books to himself.": "しかし、読書がなければ、クリフはなりたい自分になれませんでした。そこで、彼はコードを学び、Speechifyを作成して自分で本を読むようにしました。",
        "Today, Speechify helps over 50 million people read faster, remember more, and save time.": "今日、Speechifyは5000万人以上の人々がより速く読み、より多く記憶し、時間を節約するのに役立っています。",
        "Japanese Voice": "日本語音声",
        "Music icon": "音楽のアイコン",
        "Speechify Founder": "Speechify創設者",
        "Actor": "俳優",
        "Youtuber": "ユーチューバー",
        "Narrator": "ナレーター",
        "Sign In": "サインイン",
        "to explore": "探索する",
        "Female Voice": "女性の声",
        "Male Voice": "男性の声",
        "Standard Voice": "標準音声",
    },
    "Korean": {
        "Try Our AI Voices": "AI 보이스 체험하기",
        "Generate text in": "다음 언어로 텍스트 생성",
        "Cliff Weitzman is the founder of Speechify.": "Cliff Weitzman은 Speechify의 설립자입니다.",
        "Cliff is also dyslexic.": "Cliff는 난독증도 있습니다.",
        "Growing up, Cliff's dad would read him Harry Potter because he couldn't do it himself. Cliff's dad was his hero.": "어렸을 때, Cliff의 아버지는 그가 스스로 읽을 수 없었기 때문에 해리 포터를 읽어주곤 했습니다. Cliff의 아버지는 그의 영웅이었습니다.",
        "But without reading, Cliff couldn't become the person he wanted to be. So, he learned to code and created Speechify to read books to himself.": "그러나 독서 없이는 Cliff는 자신이 되고 싶은 사람이 될 수 없었습니다. 그래서 그는 코딩을 배우고 Speechify를 만들어 스스로 책을 읽었습니다.",
        "Today, Speechify helps over 50 million people read faster, remember more, and save time.": "오늘날 Speechify는 5천만 명 이상의 사람들이 더 빨리 읽고, 더 많이 기억하고, 시간을 절약하도록 돕습니다.",
        "Korean Voice": "한국어 음성",
        "Music icon": "음악 아이콘",
        "Speechify Founder": "Speechify 설립자",
        "Actor": "배우",
        "Youtuber": "유튜버",
        "Narrator": "내레이터",
        "Sign In": "로그인",
        "to explore": "탐색하기",
        "Female Voice": "여성 음성",
        "Male Voice": "남성 음성",
        "Standard Voice": "표준 음성",
    },
    "Arabic": {
        "Try Our AI Voices": "جرب أصوات الذكاء الاصطناعي لدينا",
        "Generate text in": "إنشاء نص في",
        "Cliff Weitzman is the founder of Speechify.": "كليف ويتزمان هو مؤسس Speechify.",
        "Cliff is also dyslexic.": "كليف يعاني أيضاً من عسر القراءة.",
        "Growing up, Cliff's dad would read him Harry Potter because he couldn't do it himself. Cliff's dad was his hero.": "عندما كان صغيراً، كان والد كليف يقرأ له هاري بوتر لأنه لم يتمكن من ذلك بنفسه. كان والد كليف بطله.",
        "But without reading, Cliff couldn't become the person he wanted to be. So, he learned to code and created Speechify to read books to himself.": "لكن بدون القراءة، لم يتمكن كليف من أن يصبح الشخص الذي يريده. لذلك، تعلم البرمجة وأنشأ Speechify ليقرأ الكتب لنفسه.",
        "Today, Speechify helps over 50 million people read faster, remember more, and save time.": "اليوم، يساعد Speechify أكثر من 50 مليون شخص على القراءة بشكل أسرع، وتذكر المزيد، وتوفير الوقت.",
        "Arabic Voice": "صوت عربي",
        "Music icon": "أيقونة موسيقية",
        "Speechify Founder": "مؤسس Speechify",
        "Actor": "ممثل",
        "Youtuber": "يوتيوبر",
        "Narrator": "راوي",
        "Sign In": "تسجيل الدخول",
        "to explore": "للاستكشاف",
        "Female Voice": "صوت أنثوي",
        "Male Voice": "صوت ذكوري",
        "Standard Voice": "صوت قياسي",
    },
    "Russian": {
        "Try Our AI Voices": "Попробуйте наши голоса ИИ",
        "Generate text in": "Сгенерировать текст на",
        "Cliff Weitzman is the founder of Speechify.": "Клифф Вайтцман — основатель Speechify.",
        "Cliff is also dyslexic.": "Клифф также страдает дислексией.",
        "Growing up, Cliff's dad would read him Harry Potter because he couldn't do it himself. Cliff's dad was his hero.": "В детстве отец Клиффа читал ему «Гарри Поттера», потому что сам он не мог. Отец Клиффа был его героем.",
        "But without reading, Cliff couldn't become the person he wanted to be. So, he learned to code and created Speechify to read books to himself.": "Но без чтения Клифф не мог стать тем, кем хотел быть. Поэтому он научился программировать и создал Speechify, чтобы читать книги самому себе.",
        "Today, Speechify helps over 50 million people read faster, remember more, and save time.": "Сегодня Speechify помогает более чем 50 миллионам человек читать быстрее, запоминать больше и экономить время.",
        "Russian Voice": "Русский голос",
        "Music icon": "Музыкальная икона",
        "Speechify Founder": "Основатель Speechify",
        "Actor": "Актер",
        "Youtuber": "Ютубер",
        "Narrator": "Рассказчик",
        "Sign In": "Войти",
        "to explore": "для изучения",
        "Female Voice": "Женский голос",
        "Male Voice": "Мужской голос",
        "Standard Voice": "Стандартный голос",
    },
    "Hindi": {
        "Try Our AI Voices": "हमारी एआई आवाज़ें आज़माएं",
        "Generate text in": "इसमें टेक्स्ट जनरेट करें",
        "Cliff Weitzman is the founder of Speechify.": "क्लिफ वीट्ज़मैन स्पीचिफाई के संस्थापक हैं।",
        "Cliff is also dyslexic.": "क्लिफ को डिस्लेक्सिया भी है।",
        "Growing up, Cliff's dad would read him Harry Potter because he couldn't do it himself. Cliff's dad was his hero.": "बड़े होते हुए, क्लिफ के पिता उसे हैरी पॉटर पढ़कर सुनाते थे क्योंकि वह खुद ऐसा नहीं कर सकता था। क्लिफ के पिता उसके हीरो थे।",
        "But without reading, Cliff couldn't become the person he wanted to be. So, he learned to code and created Speechify to read books to himself.": "लेकिन पढ़ने के बिना, क्लिफ वह व्यक्ति नहीं बन सकता था जो वह बनना चाहता था। इसलिए, उसने कोड करना सीखा और खुद को किताबें पढ़ने के लिए स्पीचिफाई बनाया।",
        "Today, Speechify helps over 50 million people read faster, remember more, and save time.": "आज, स्पीचिफाई 5 करोड़ से अधिक लोगों को तेज़ी से पढ़ने, अधिक याद रखने और समय बचाने में मदद करता है।",
        "Hindi Voice": "हिंदी आवाज",
        "Music icon": "संगीत आइकन",
        "Speechify Founder": "स्पीचिफाई संस्थापक",
        "Actor": "अभिनेता",
        "Youtuber": "यूट्यूबर",
        "Narrator": "कथावाचक",
        "Sign In": "साइन इन करें",
        "to explore": "पता लगाने के लिए",
        "Female Voice": "महिला आवाज",
        "Male Voice": "पुरुष आवाज",
        "Standard Voice": "मानक आवाज",
    },
    "Urdu": {
        "Try Our AI Voices": "ہماری AI آوازیں آزمائیں",
        "Generate text in": "میں متن بنائیں",
        "Cliff Weitzman is the founder of Speechify.": "کلف وِٹزمین Speechify کے بانی ہیں۔",
        "Cliff is also dyslexic.": "کلف کو ڈسلیکسیا بھی ہے۔",
        "Growing up, Cliff's dad would read him Harry Potter because he couldn't do it himself. Cliff's dad was his hero.": "بچپن میں، کلف کے والد اسے ہیری پوٹر پڑھ کر سناتے تھے کیونکہ وہ خود ایسا نہیں کر سکتا تھا۔ کلف کے والد اس کے ہیرو تھے۔",
        "But without reading, Cliff couldn't become the person he wanted to be. So, he learned to code and created Speechify to read books to himself.": "لیکن پڑھنے کے بغیر، کلف وہ شخص نہیں بن سکتا تھا جو وہ بننا چاہتا تھا۔ چنانچہ، اس نے کوڈنگ سیکھی اور خود کو کتابیں پڑھنے کے لیے Speechify بنایا۔",
        "Today, Speechify helps over 50 million people read faster, remember more, and save time.": "آج، Speechify 50 ملین سے زیادہ لوگوں کو تیزی سے پڑھنے، زیادہ یاد رکھنے، اور وقت بچانے میں مدد کرتا ہے۔",
        "Music icon": "میوزک آئیکن",
        "Speechify Founder": "اسپیچیفائی کے بانی",
        "Actor": "اداکار",
        "Youtuber": "یوٹیوبر",
        "Narrator": "راوی",
        "Sign In": "سائن ان کریں",
        "to explore": "دریافت کرنے کے لیے",
        "Female Voice": "خواتین کی آواز",
        "Male Voice": "مردانہ آواز",
        "Standard Voice": "معیاری آواز",
    },
    // Add other languages with their respective translations
};

const Toph1 = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [activeSpeakerIndex, setActiveSpeakerIndex] = useState(0);
    const [textInput, setTextInput] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentAudio, setCurrentAudio] = useState(null);
    const [voiceSettings, setVoiceSettings] = useState({});
    const [loading, setLoading] = useState(false);

    // Initialize voice settings for each language and speaker
    useEffect(() => {
        const settings = {};
        Object.keys(languageSpeakers).forEach(lang => {
            const speakers = languageSpeakers[lang] || languageSpeakers.default;
            speakers.forEach((speaker, index) => {
                const key = `${lang}-${index}`;
                settings[key] = {
                    pitch: index % 2 === 0 ? 1.1 : 0.9, // Higher pitch for even indexes (typically female)
                    speed: 1.0,
                    speakerId: `${lang.toLowerCase()}-${index}`,
                    emotion: 'neutral',
                    language: lang
                };
            });
        });
        setVoiceSettings(settings);
    }, []);

    // Function to get translated text
    const t = (key) => {
        return translations[selectedLanguage]?.[key] || key;
    };

    // Get speakers for the selected language
    const getSpeakersForLanguage = (language) => {
        return languageSpeakers[language] || languageSpeakers.default;
    };

    const speakerData = getSpeakersForLanguage(selectedLanguage);

    const handleLanguageSelect = (languageName) => {
        setSelectedLanguage(languageName);
        setActiveSpeakerIndex(0);
    };

    const handleTextInputChange = (e) => {
        setTextInput(e.target.value);
    };

    // Generate TTS audio using Coqui API
    const generateTTS = async () => {
        const settingsKey = `${selectedLanguage}-${activeSpeakerIndex}`;
        const settings = voiceSettings[settingsKey] || {
            pitch: 1.0,
            speed: 1.0,
            speakerId: `${selectedLanguage.toLowerCase()}-${activeSpeakerIndex}`
        };

        const textToSpeak = [
            t("Cliff Weitzman is the founder of Speechify."),
            t("Cliff is also dyslexic."),
            t("Growing up, Cliff's dad would read him Harry Potter because he couldn't do it himself. Cliff's dad was his hero."),
            t("But without reading, Cliff couldn't become the person he wanted to be. So, he learned to code and created Speechify to read books to himself."),
            t("Today, Speechify helps over 50 million people read faster, remember more, and save time.")
        ].join(" ");

        try {
            setLoading(true);
            const response = await fetch('https://your-coqui-tts-backend-api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: textToSpeak,
                    language: selectedLanguage,
                    speaker_id: settings.speakerId,
                    pitch: settings.pitch,
                    speed: settings.speed,
                    emotion: settings.emotion
                })
            });

            if (!response.ok) {
                throw new Error('TTS generation failed');
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            return audioUrl;
        } catch (error) {
            console.error('Error generating TTS:', error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Play the generated TTS
    const playTTS = async () => {
        setIsPlaying(true);
        const audioUrl = await generateTTS();

        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.onended = () => {
                setIsPlaying(false);
                setCurrentAudio(null);
            };
            audio.onerror = () => {
                setIsPlaying(false);
                setCurrentAudio(null);
            };

            // Stop any currently playing audio
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }

            setCurrentAudio(audio);
            audio.play();
        } else {
            setIsPlaying(false);
        }
    };

    // Stop TTS playback
    const stopTTS = () => {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            setCurrentAudio(null);
        }
        setIsPlaying(false);
    };

    // Clean up audio objects on unmount
    useEffect(() => {
        return () => {
            if (currentAudio) {
                currentAudio.pause();
                URL.revokeObjectURL(currentAudio.src);
            }
        };
    }, [currentAudio]);

    return (
        <>
            <div className='bg-gray-100/20 w-[75%] h-[0.1rem]'></div>
            <h1 className='text-[3rem] text-[white] font-bold relative top-[3rem] right-[30rem]'>{t("Try Our AI Voices")}</h1>

            <div id='speech-content' className='bg-white h-[45rem] w-[75%] relative top-[8rem] rounded-[2rem] flex flex-col justify-between p-[24px] lg:px-[48px] lg:py-[32px]'>
                <div className="font-ABCDiatype text-glass-800 -mx-4 lg:mx-0 flex-grow" data-testid="voice-demo">
                    <div>
                        <div className="flex flex-col items-start gap-1 lg:mx-0 lg:flex-row lg:items-center lg:gap-4">
                            <div className="whitespace-nowrap text-sm font-medium lg:mx-0 lg:text-base text-black">
                                <span>{t("Generate text in")}</span>
                            </div>
                            <div className="flex w-full min-w-0 flex-1 items-center lg:gap-1">
                                <button aria-label="previous" className="relative hidden rounded-full p-2 text-lg font-medium transition-all duration-300 ease-out hover:bg-[#F1F4F9] lg:block opacity-0 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" className="mr-px text-xl" viewBox="0 0 24 24">
                                        <path fill="currentColor" fillRule="evenodd" d="M15.707 5.293a1 1 0 0 1 0 1.414L10.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 0Z" clipRule="evenodd"></path>
                                    </svg>
                                </button>
                                <div className="relative min-w-0 flex-1">
                                    <span className="absolute inset-y-0 left-0 z-10 hidden w-8 bg-gradient-to-r from-white to-transparent lg:block lg:w-10 lg:hidden"></span>
                                    <div className="no-scrollbar w-full max-w-full overflow-auto">
                                        <div className="flex gap-2 leading-none">
                                            {languages.map((lang) => (
                                                <button
                                                    key={lang.name}
                                                    onClick={() => handleLanguageSelect(lang.name)}
                                                    className={`flex cursor-pointer items-center gap-2 rounded-xl border-2 px-[14px] py-[10px] text-xs font-medium leading-normal transition-colors hover:border-[#e4eaf1] hover:bg-[#e4eaf1] md:rounded-2xl md:px-4 md:text-[16px] text-black
                                                    ${selectedLanguage === lang.name ? 'bg-white !border-[#F3F6FA]' : 'bg-[#F1F4F9] border-transparent'}
                                                    `}
                                                >
                                                    <img alt={lang.name} loading="lazy" width="16" height="12" decoding="async" data-nimg="1" className="flex min-w-4 items-center object-cover" style={{ color: 'transparent' }} src={lang.flag} />
                                                    <div className="min-w-0 whitespace-nowrap">{lang.name}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <span className="bg-reg absolute inset-y-0 right-0 z-10 hidden w-8 bg-gradient-to-r from-transparent to-white lg:block lg:w-10"></span>
                                </div>
                                <button aria-label="next" className="relative hidden rounded-full p-2 text-lg transition-all duration-300 ease-out hover:bg-[#F1F4F9] lg:block">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" className="ml-px text-xl" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            fillRule="evenodd"
                                            d="M8.293 5.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414L13.586 12 8.293 6.707a1 1 0 0 1 0-1.414Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 lg:mt-10 lg:flex-row lg:gap-4">
                            <div className="flex-1">
                                <div className="mt-4 xl:w-11/12 styles_textAreaWrapper__tzqm2">
                                    <div className="relative">
                                        <span className="absolute inset-x-0 top-0 z-20 h-8 bg-gradient-to-b from-white to-transparent lg:h-10 hidden"></span>
                                        <div className="relative h-[320px] overflow-y-auto p-2 pb-12 text-left lg:h-[480px] text-content-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" className="pointer-events-none absolute top-[9px] size-5 animate-pulse" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12.5971 4.70154L13.624 3.67466C14.3562 2.94243 15.5434 2.94243 16.2756 3.67466C17.0079 4.4069 17.0079 5.59408 16.2756 6.32631L15.2488 7.35319L12.5971 4.70154ZM11.2713 6.02736L4.78516 12.5135L7.43681 15.1651L13.9229 8.67901L11.2713 6.02736Z" fill="#1E49EE"></path>
                                                <path d="M3.26512 15.8568L4.78516 12.5127L7.43681 15.1643L4.09272 16.6844C3.56699 16.9234 3.02615 16.3825 3.26512 15.8568Z" fill="#1E49EE"></path>
                                            </svg>
                                            <div className="relative z-10 h-full">
                                                <div
                                                    className="h-full w-full flex flex-col align-start justify-start gap-10 outline-none resize-none border-transparent text-black bg-transparent"
                                                    value={textInput}
                                                    onChange={handleTextInputChange}
                                                    rows={10}
                                                    spellCheck="true"
                                                >
                                                    <p className='font-normal text-black text-xl ml-[1.rem]'>{t("Cliff Weitzman is the founder of Speechify.")}</p>
                                                    <p className='font-normal text-black text-xl'>{t("Cliff is also dyslexic.")}</p>
                                                    <p className='font-normal text-black text-xl'>{t("Growing up, Cliff's dad would read him Harry Potter because he couldn't do it himself. Cliff's dad was his hero.")}</p>
                                                    <p className='font-normal text-black text-xl'>{t("But without reading, Cliff couldn't become the person he wanted to be. So, he learned to code and created Speechify to read books to himself.")}</p>
                                                    <p className='font-normal text-black text-xl'>{t("Today, Speechify helps over 50 million people read faster, remember more, and save time.")}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="absolute inset-x-0 bottom-0 z-20 h-8 bg-gradient-to-t from-white to-transparent lg:h-10 hidden"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="relative flex-1">
                                <span className="absolute inset-x-0 top-0 z-20 h-8 bg-gradient-to-b from-white to-transparent lg:h-10 hidden"></span>
                                <span className="absolute inset-x-0 bottom-0 z-20 h-8 bg-gradient-to-t from-white to-transparent lg:h-10 hidden"></span>
                                <div className="no-scrollbar -mx-6 w-[101%] grid max-h-[500px] auto-cols-max grid-flow-col justify-between gap-4 overflow-y-auto px-6 py-4 lg:mx-0 lg:grid-flow-row lg:grid-cols-4 lg:px-0 xl:gap-x-5 lg:gap-x-3">
                                    {speakerData.map((speaker, i) => (
                                        <div
                                            key={i}
                                            className="z-80 group relative flex flex-col items-center gap-3 cursor-pointer"
                                            onClick={() => setActiveSpeakerIndex(i)}
                                        >
                                            <div
                                                className={`h-[9rem] w-[9rem] bg-[#f0f4f9] rounded-full overflow-hidden hover:bg-blue-100 cursor-pointer animate-fade-in
                                                ${speaker.name === t("Sign In") ? 'bg-white' : 'bg-white'} 
                                                ${activeSpeakerIndex === i ? 'ring-4 ring-blue-500' : ''}`}
                                            >
                                                <img
                                                    className={`object-cover ${speaker.name === t("Sign In") ? 'h-[2rem] w-[2rem] relative left-[3.3rem] mt-10' : 'h-full w-full'}`}
                                                    src={speaker.image}
                                                    alt={speaker.name}
                                                />
                                                {speaker.name === t("Sign In") && (
                                                    <span className="text-gray-500 font-bold text-[1.3rem] relative left-[3rem] block mt-1">200+</span>
                                                )}
                                            </div>

                                            <div className="mt-2 text-center text-black">
                                                <p className="font-semibold text-lg text-black">{speaker.name}</p>
                                                <p className="text-sm text-gray-600">{speaker.role}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center mt-4">
                    <button
                        className={`flex items-center justify-center relative bottom-[1rem] rounded-full bg-[#2f43fa] text-white p-4 shadow-lg hover:bg-[#1e2bfa] transition-colors duration-300 transform scale-100 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                        ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        onClick={isPlaying ? stopTTS : playTTS}
                        disabled={loading}
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                        {loading ? (
                            <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <svg width="3em" height="3em" viewBox="0 0 16 16" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d={
                                        isPlaying
                                            ? 'M5.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8a.5.5 0 0 1 .5-.5z'
                                            : 'M7.05 10.8579L10.95 8.60622C11.4167 8.33679 11.4167 7.66321 10.95 7.39378L7.05 5.14212C6.58333 4.87269 6 5.20947 6 5.74833V10.2517C6 10.7905 6.58333 11.1273 7.05 10.8579Z'
                                    }
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Toph1;