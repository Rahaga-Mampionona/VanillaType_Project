document.addEventListener("DOMContentLoaded", () => {
    let startTime = null;
    let timerInterval = null;
    let currentQuote = "";
    let incorrectChars = 0;
    let isCompleted = false;
  
    const modeSelect = document.getElementById("mode");
    const quoteDisplay = document.getElementById("quote-display");
    const quoteAuthor = document.getElementById("quote-author");
    const inputField = document.getElementById("input__place");
    const results = document.getElementById("results");
    const progressBar = document.getElementById("progress__bar");
    const errorCount = document.getElementById("quoteMode__error--count");
    const timeCount = document.getElementById("quoteMode__time--count");
    const wpmCount = document.getElementById("quoteMode__wpm--count");
    const navToggle = document.getElementById("navToggle");
    const sidebar = document.getElementById("sidebar");
    const closeBtn = document.getElementById("closeBtn");
    const overlay = document.getElementById("overlay");
    const replayBtn = document.getElementById("replayBtn");
    const quitBtn = document.getElementById("quitBtn");
  
    const quotes = {
      easy: [
        {
          text: "Aimer, ce n'est pas se regarder l'un l'autre, c'est regarder ensemble dans la même direction.",
          author: "Antoine de Saint-Exupéry",
          info: {
            context: "Réflexion sur l’amour durable et la complicité dans le couple",
            meaning: "L’amour véritable repose sur des objectifs communs et une vision partagée",
            date: "1942",
            source: "Terre des Hommes"
          }
        },
        {
          text: "Fais de ta vie un rêve, et d’un rêve, une réalité.",
          author: "Antoine de Saint-Exupéry",
          info: {
            context: "Encouragement à poursuivre ses idéaux",
            meaning: "Réalise tes aspirations par l’action et la persévérance",
            date: "1939",
            source: "Terre des Hommes"
          }
        },
        {
          text: "Il n'y a qu'une façon d'échouer, c'est d'abandonner avant d'avoir réussi.",
          author: "Georges Clémenceau",
          info: {
            context: "Propos sur la persévérance face à l'échec",
            meaning: "L’échec ne devient réel que si l’on cesse d’essayer",
            date: "1920",
            source: "Discours politiques"
          }
        },
        {
          text: "L’amour est la seule chose qu’on emporte dans l’éternité.",
          author: "Emile Zola",
          info: {
            context: "Réflexion sur la profondeur du sentiment amoureux",
            meaning: "L’amour est un héritage immatériel et intemporel",
            date: "1898",
            source: "Lettre à Jeanne Rozerot"
          }
        },
        {
          text: "Un sourire coûte moins cher que l'électricité, mais donne autant de lumière.",
          author: "Abbé Pierre",
          info: {
            context: "Propos humaniste sur la puissance des gestes simples",
            meaning: "La gentillesse peut illuminer une journée",
            date: "1980",
            source: "Discours aux Enfants de Don Quichotte"
          }
        }
      ],
      medium: [
        {
          text: "La plus grande gloire n'est pas de ne jamais tomber, mais de se relever à chaque chute.",
          author: "Confucius",
          info: {
            context: "Philosophie morale sur la résilience",
            meaning: "La valeur se trouve dans la capacité à persévérer malgré les échecs",
            date: "env. -500",
            source: "Analectes"
          }
        },
        {
          text: "On ne voit bien qu'avec le cœur. L’essentiel est invisible pour les yeux.",
          author: "Antoine de Saint-Exupéry",
          info: {
            context: "Leçon donnée par le renard au Petit Prince",
            meaning: "Les émotions et les valeurs profondes échappent à l’apparence",
            date: "1943",
            source: "Le Petit Prince"
          }
        },
        {
          text: "Tout ce que l’esprit de l’homme peut concevoir et croire, il peut l’accomplir.",
          author: "Napoleon Hill",
          info: {
            context: "Pensée sur la puissance de la croyance personnelle",
            meaning: "Les limites sont souvent mentales plus que réelles",
            date: "1937",
            source: "Réfléchissez et devenez riche"
          }
        },
        {
          text: "Aimer, ce n’est pas seulement aimer bien, c’est surtout comprendre.",
          author: "Françoise Sagan",
          info: {
            context: "Réflexion sur l’amour mature",
            meaning: "L’amour sincère inclut une véritable compréhension de l’autre",
            date: "1960",
            source: "Interviews littéraires"
          }
        },
        {
          text: "Ne laisse jamais personne te dire que tu n’es pas capable.",
          author: "Will Smith",
          info: {
            context: "Conseil de vie dans un film inspirant",
            meaning: "Crois en ton potentiel même quand les autres doutent",
            date: "2006",
            source: "À la recherche du bonheur (film)"
          }
        }
      ],
      hard: [
        {
          text: "Ce n’est pas l’amour qui soutient le couple, mais le mode de vie, le projet commun, et la volonté d’avancer ensemble.",
          author: "Jacques Salomé",
          info: {
            context: "Pensée psychologique sur les relations amoureuses",
            meaning: "L’amour nécessite un engagement actif au quotidien",
            date: "2003",
            source: "Parle-moi... j’ai des choses à te dire"
          }
        },
        {
          text: "Il est plus facile de désintégrer un atome qu’un préjugé.",
          author: "Albert Einstein",
          info: {
            context: "Critique des idées préconçues qui freinent la compréhension humaine",
            meaning: "Les pensées profondes demandent plus d’effort que la science",
            date: "1946",
            source: "Lettre à un ami philosophe"
          }
        },
        {
          text: "Aimer, c’est agir pour que l’autre se sente libre d’être lui-même.",
          author: "Jacques Salomé",
          info: {
            context: "Concept d’amour non possessif",
            meaning: "L’amour véritable libère, il ne contraint pas",
            date: "2005",
            source: "T’es toi quand je te parle ?"
          }
        },
        {
          text: "Notre plus grande peur n’est pas que nous soyons inadéquats. Notre plus grande peur est que nous soyons puissants au-delà de toute limite.",
          author: "Marianne Williamson",
          info: {
            context: "Discours sur l’estime de soi et le potentiel personnel",
            meaning: "Nous avons souvent peur de notre propre grandeur",
            date: "1992",
            source: "Un retour à l’amour"
          }
        },
        {
          text: "Aime comme si tu n’avais jamais souffert, travaille comme si tu n’avais pas besoin d’argent, danse comme si personne ne te regardait.",
          author: "Satchel Paige",
          info: {
            context: "Maxime sur le lâcher-prise et la joie de vivre",
            meaning: "Vis intensément et authentiquement",
            date: "1952",
            source: "Citations célèbres de joueurs de baseball"
          }
        }
      ]
    };
  
    const getRandomQuote = (mode) => {
      const quoteList = quotes[mode];
      return quoteList[Math.floor(Math.random() * quoteList.length)];
    };
  
    const displayQuoteInfo = (quote) => {
      document.getElementById("quoteAuthorInfo").textContent = quote.author;
      document.getElementById("quoteContext").textContent = quote.info.context;
      document.getElementById("quoteMeaning").textContent = quote.info.meaning;
      document.getElementById("quoteDate").textContent = quote.info.date;
      document.getElementById("quoteSource").textContent = quote.info.source;
    };
  
    const startTest = () => {
      clearInterval(timerInterval);
      startTime = null;
      isCompleted = false;
  
      const quote = getRandomQuote(modeSelect.value);
      currentQuote = quote.text;
  
      quoteDisplay.textContent = quote.text;
      quoteAuthor.textContent = `— ${quote.author}`;
      displayQuoteInfo(quote);
  
      inputField.value = "";
      inputField.disabled = false;
      progressBar.style.width = "0%";
      results.textContent = "Prêt ?";
      errorCount.textContent = "Fautes : 0";
      timeCount.textContent = "Temps : 0s";
      wpmCount.textContent = "WPM : 0";
      inputField.focus();
    };
  
    const startTimer = () => {
      if (!startTime) {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 100);
      }
    };
  
    const updateTimer = () => {
      if (startTime) {
        const elapsedSeconds = ((Date.now() - startTime) / 1000).toFixed(1);
        timeCount.textContent = `Temps : ${elapsedSeconds}s`;
      }
    };
  
    const calculateWPM = (correctChars, timeInSeconds) => {
      if (timeInSeconds === 0) return 0;
      const words = correctChars / 5;
      const minutes = timeInSeconds / 60;
      return Math.round(words / minutes);
    };
  
    const updateProgress = (typedText) => {
      let correctChars = 0;
      for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === currentQuote[i]) {
          correctChars++;
        }
      }
  
      const percent = (correctChars / currentQuote.length) * 100;
      progressBar.style.width = `${percent}%`;
      return correctChars;
    };
  
    const checkCompletion = (typedText) => {
      if (typedText === currentQuote) {
        isCompleted = true;
        clearInterval(timerInterval);
        inputField.disabled = true;
  
        const elapsedSeconds = ((Date.now() - startTime) / 1000).toFixed(1);
        const wpm = calculateWPM(currentQuote.length, elapsedSeconds);
  
        results.textContent = "Terminé !";
        wpmCount.textContent = `WPM : ${wpm}`;
        return true;
      }
      return false;
    };
  
    const countErrors = (typedText) => {
      let errors = 0;
      for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] !== currentQuote[i]) {
          errors++;
        }
      }
      incorrectChars = errors;
      errorCount.textContent = `Fautes : ${incorrectChars}`;
    };
  
    const handleInput = () => {
      const typedText = inputField.value;
  
      if (!startTime && typedText.length > 0) {
        startTimer();
        results.textContent = "En cours...";
      }
  
      if (!isCompleted) {
        updateProgress(typedText);
        countErrors(typedText);
        checkCompletion(typedText);
  
        if (startTime) {
          const elapsedSeconds = (Date.now() - startTime) / 1000;
          const correctChars = typedText.length - incorrectChars;
          const wpm = calculateWPM(correctChars, elapsedSeconds);
          wpmCount.textContent = `WPM : ${wpm}`;
        }
      }
    };
  
    navToggle.addEventListener("click", () => {
      sidebar.classList.add("active");
      overlay.classList.add("active");
      navToggle.classList.add("hide");
    });
  
    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
      navToggle.classList.remove("hide");
    });
  
    overlay.addEventListener("click", () => {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
      navToggle.classList.remove("hide");
    });
  
    replayBtn.addEventListener("click", () => {
      startTest();
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
    });
  
    quitBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  
    const searchDictionary = () => {
      const input = document.getElementById("dictionaryInput").value.trim().toLowerCase();
      const resultsContainer = document.getElementById("dictionaryResults");
      resultsContainer.innerHTML = "";
  
      if (!input || !dictionaryData) return;
  
      if (dictionaryData[input]) {
        displayDictionaryResult(input, dictionaryData[input]);
        return;
      }
  
      const matches = Object.entries(dictionaryData)
        .filter(([word]) => word.includes(input))
        .slice(0, 5);
  
      if (matches.length > 0) {
        matches.forEach(([word, data]) => {
          displayDictionaryResult(word, data);
        });
      } else {
        resultsContainer.innerHTML = `<p class="no-results">Aucun résultat trouvé pour "${input}"</p>`;
      }
    };
  
    const displayDictionaryResult = (word, data) => {
      const resultsContainer = document.getElementById("dictionaryResults");
      const resultDiv = document.createElement("div");
      resultDiv.className = "dictionary-item";
      resultDiv.innerHTML = `
        <div class="dictionary-word">${word}</div>
        <div class="dictionary-definition">${data.definition}</div>
        ${data.synonyms ? `<div class="dictionary-synonyms"><strong>Synonymes:</strong> ${data.synonyms.map(syn => `<span class="synonym-tag">${syn}</span>`).join("")}</div>` : ""}
      `;
      resultsContainer.appendChild(resultDiv);
    };
  
    document.getElementById("searchDictionary")?.addEventListener("click", searchDictionary);
    document.getElementById("dictionaryInput")?.addEventListener("keyup", (e) => {
      if (e.key === "Enter") searchDictionary();
    });
  
    quoteDisplay.addEventListener("click", (e) => {
      if (e.target.tagName === "SPAN") {
        const word = e.target.textContent.trim();
        const input = document.getElementById("dictionaryInput");
        if (input) {
          input.value = word;
          searchDictionary();
        }
      }
    });
  
    inputField.addEventListener("input", handleInput);
    modeSelect.addEventListener("change", startTest);
  
    startTest();
  
    
  });