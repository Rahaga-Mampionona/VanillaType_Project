document.addEventListener("DOMContentLoaded", () => {
    let startTime = null;
    let currentWordIndex = 0;
    let wordsToType = [];
    let incorrectWords = 0;
    let totalCharactersTyped = 0;
  
    const modeSelect = document.getElementById("mode");
    const wordDisplay = document.getElementById("word-display");
    const inputField = document.getElementById("input__place");
    const results = document.getElementById("results");
    const progressBar = document.getElementById("progress__bar");
    const errorCount = document.getElementById("wordsMode__error--count");
    const navToggle = document.getElementById("navToggle");
    const sidebar = document.getElementById("sidebar");
    const closeBtn = document.getElementById("closeBtn");
    const overlay = document.getElementById("overlay");
    const replayBtn = document.getElementById("replayBtn");
    const quitBtn = document.getElementById("quitBtn");
  
    const words = {
      easy: ["chat", "pomme", "bleu", "soleil", "lune"],
      medium: ["clavier", "bureau", "écran", "chargeur", "batterie"],
      hard: ["synchronisation", "développement", "extravagant", "compliqué", "malentendu"]
    };
  
    const dictionaryData = {
      "chat": {
        definition: "Petit mammifère carnivore, familier, au museau court et arrondi, aux oreilles pointues.",
        synonyms: ["matou", "minet", "félin", "mistigri"]
      },
      "pomme": {
        definition: "Fruit comestible du pommier, de forme ronde, à peau lisse ou rugueuse, de couleur variable.",
        synonyms: ["pomiculte", "fruit", "reinette", "golden"]
      },
      "bleu": {
        defintion: "Couleur fondamentale du spectre visible, perçue par l'œil humain lorsque la lumière a une longueur d'onde comprise approximativement entre 450 et 495 nanomètres.",
        synonyms: ["azur", "céruléen", "saphir", "marine"]
      },
      "soleil": {
        defintion: "L'étoile autour de laquelle la Terre et les autres planètes de notre système solaire gravitent.",
        synonyms: ["Astre du jour"]
      },
      "lune": {
        defintion: "Le seul satellite naturel permanent de la Terre.",
        synonyms: ["Satellite naturel de la Terre", "Astre nocturne"]
      },
      "clavier": {
        definition: "Ensemble des touches d'une machine à écrire, d'un ordinateur, d'un piano, etc.",
        synonyms: ["piano", "keyboard", "touches", "azerty"]
      },
      "bureau": {
        definition: "Meuble généralement plat et muni de tiroirs, utilisé pour écrire, lire ou travailler.",
        synonyms: ["table", "mobilier", "poste de travail", "plan de travail"]
      },
      "écran": {
        definition: "Surface plane sur laquelle sont projetées des images ou affichées des informations.",
        synonyms: ["moniteur", "affichage", "visualiseur", "téléviseur"]
      },
      "chargeur": {
        definition: "Appareil électrique utilisé pour recharger une batterie ou un accumulateur.",
        synonyms: ["alimenteur", "adaptateur", "transformateur", "source d'alimentation"]
      },
      "batterie": {
        definition: "Dispositif électrochimique qui convertit l'énergie chimique en énergie électrique.",
        synonyms: ["accumulateur", "pile", "source d'énergie", "réserve d'énergie"]
      },
      "synchronisation": {
        definition: "Action de synchroniser, de faire coïncider dans le temps des phénomènes, des mouvements.",
        synonyms: ["coordination", "harmonisation", "ajustement", "alignement"]
      },
      "développement": {
        definition: "Action de développer, de faire croître, de progresser ou d'améliorer quelque chose.",
        synonyms: ["croissance"]
      },
      "extravagant": {
        definition: "Qui dépasse les limites de la raison, de la modération ou de l'usage courant.",
        synonyms: ["excentrique"]
      },
      "compliqué": {
        definition: "Qui n'est pas simple, qui présente de nombreuses difficultés ou éléments interdépendants.",
        synonyms: ["complexe"]
      },
      "malentendu": {
        definition: "Désaccord ou mauvaise interprétation entre deux ou plusieurs personnes.",
        synonyms: ["quiproco"]
      }
    };
  
    const getRandomWord = (mode) => {
      const wordList = words[mode];
      return wordList[Math.floor(Math.random() * wordList.length)];
    };
  
    const startTest = (wordCount = 30) => {
      wordsToType = [];
      wordDisplay.innerHTML = "";
      currentWordIndex = 0;
      startTime = null;
      incorrectWords = 0;
      totalCharactersTyped = 0;
      progressBar.style.width = "0%";
      results.textContent = "Résultats :";
      errorCount.textContent = "Fautes : 0";
  
      for (let i = 0; i < wordCount; i++) {
        wordsToType.push(getRandomWord(modeSelect.value));
      }
  
      wordsToType.forEach((word, index) => {
        const span = document.createElement("span");
        span.textContent = word + " ";
        if (index === 0) span.style.color = "red";
        wordDisplay.appendChild(span);
      });
  
      inputField.value = "";
      inputField.focus();
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
      
      if (!input) return;
      
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
        ${data.synonyms ? `
          <div class="dictionary-synonyms">
            <strong>Synonymes:</strong>
            ${data.synonyms.map(syn => `<span class="synonym-tag">${syn}</span>`).join("")}
          </div>
        ` : ""}
      `;
      
      resultsContainer.appendChild(resultDiv);
    };
  
    document.getElementById("searchDictionary").addEventListener("click", searchDictionary);
    document.getElementById("dictionaryInput").addEventListener("keyup", (e) => {
      if (e.key === "Enter") searchDictionary();
    });
  
    wordDisplay.addEventListener("click", (e) => {
      if (e.target.tagName === "SPAN") {
        const word = e.target.textContent.trim();
        document.getElementById("dictionaryInput").value = word;
        searchDictionary();
      }
    });
  
    const startTimer = () => {
      if (!startTime) startTime = Date.now();
    };
  
    const updateProgress = () => {
      const percent = ((currentWordIndex + 1) / wordsToType.length) * 100;
      progressBar.style.width = `${percent}%`;
    };
  
    const getCurrentStats = () => {
      const elapsedSeconds = (Date.now() - startTime) / 1000;
      const charsTyped = totalCharactersTyped;
      const wpm = (charsTyped / 5) / (elapsedSeconds / 60);
      const accuracy = ((charsTyped - incorrectWords) / charsTyped) * 100;
      
      return {
        wpm: wpm.toFixed(1),
        accuracy: Math.min(accuracy.toFixed(1), 100)
      };
    };
  
    const updateWord = (event) => {
      if (event.key === " ") {
        event.preventDefault();
        const input = inputField.value.trim();
        totalCharactersTyped += input.length;
        
        if (input === wordsToType[currentWordIndex]) {
          if (!startTime) startTimer();
          
          const { wpm, accuracy } = getCurrentStats();
          results.textContent = `Résultats : WPM : ${wpm} | Précision : ${accuracy}%`;
          
          currentWordIndex++;
          updateProgress();
          highlightNextWord();
        } else {
          incorrectWords++;
          errorCount.textContent = `Fautes : ${incorrectWords}`;
        }
        
        inputField.value = "";
      }
    };
  
    const highlightNextWord = () => {
      const wordElements = wordDisplay.children;
      
      if (currentWordIndex < wordElements.length) {
        if (currentWordIndex > 0) {
          wordElements[currentWordIndex - 1].style.color = "black";
        }
        wordElements[currentWordIndex].style.color = "red";
      } else {
        wordElements[currentWordIndex - 1].style.color = "black";
        results.textContent += " ✅ Test terminé !";
      }
    };
  
    inputField.addEventListener("keydown", updateWord);
    modeSelect.addEventListener("change", () => startTest());
    
    startTest();
  });