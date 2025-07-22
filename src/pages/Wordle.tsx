import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import Keyboard, { SimpleKeyboard } from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
// import wordsList from '../json/words.json';
import wordsList from '../json/ukrainian-words.json';

const DEFAULT_MAX_STEPS = 5;
const MAX_WORD_LENGTH = 5;
const EMPTY = '*****';
const LETTER_CORRECT = 'letter-green';
const LETTER_PRESENT = 'letter-yellow';
const LETTER_ABSENT = 'letter-grey';

const getRandomWord = () => {
  const list = Array.from(new Set(wordsList)).filter((word) => word.length === MAX_WORD_LENGTH);

  return list[Math.floor(Math.random() * list.length)];
};

const Wordle = () => {
  const [maxSteps, setMaxSteps] = useState(DEFAULT_MAX_STEPS);
  const [isHelpUsed, setIsHelpUsed] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [guess, setGuess] = useState<string>(getRandomWord);
  const [letters, setLetters] = useState<Array<Record<string, string>>>([]);

  const keyboardRef = useRef<SimpleKeyboard>(null);
  const [step, setStep] = useState<number>(0);
  const [words, setWords] = useState<Array<string>>(Array(maxSteps).fill(EMPTY));
  const [score, setScore] = useState(0);
  const scoreRef = useRef<HTMLHeadingElement>(null);

  const refreshGame = useCallback(() => {
    setMaxSteps(DEFAULT_MAX_STEPS);
    setStep(0);
    setLetters([]);
    setWords(Array(DEFAULT_MAX_STEPS).fill(EMPTY));
    setGuess(getRandomWord());
    setIsGameOver(false);
  }, []);

  const handleScoreChange = useCallback(() => {
    if (scoreRef.current) {
      const increment = DEFAULT_MAX_STEPS - step > 0 ? DEFAULT_MAX_STEPS - step : 1;
      setScore(score + increment);

      scoreRef.current.classList.remove('score-change');
      void scoreRef.current.offsetWidth; // Force reflow
      scoreRef.current.classList.add('score-change');
    }
  }, [score, step]);

  useEffect(() => {
    if (step == maxSteps) {
      setIsGameOver(true);
      if (
        prompt(`Game Over! The correct word was: ${guess}. Would you like to play again? (yes/no)`, 'yes') === 'yes'
      ) {
        refreshGame();
      }
    }
  }, [step, guess, refreshGame, maxSteps]);

  const handleKeyboardInput = (input: string) => {
    if (isGameOver) {
      return;
    }
    const adjustedInput = input.padEnd(MAX_WORD_LENGTH, '*').slice(0, MAX_WORD_LENGTH);

    if (EMPTY !== adjustedInput) {
      setWords((words) => {
        const copy = [...words];
        copy[step] = adjustedInput;
        return copy;
      });
    }
    if (input.length > MAX_WORD_LENGTH) {
      keyboardRef.current?.setInput(input.slice(0, MAX_WORD_LENGTH));
    }
  };

  const handleKeyPress = (button: string) => {
    const currentWord = words[step];

    if (isGameOver) {
      return;
    }

    if (button === '{bksp}') {
      if (keyboardRef.current?.getInput().length === 1) {
        setWords((words) => {
          const copy = [...words];
          copy[step] = EMPTY;
          return copy;
        });
      }
    }

    if (button === '{enter}' && !currentWord.includes('*')) {
      if (step < maxSteps) {
        keyboardRef.current?.setInput('');

        const newLetters: Record<string, string> = {};
        currentWord.split('').forEach((letter, index) => {
          const letterKey = getLetterKey(letter, index);

          if (letter === guess[index]) {
            newLetters[letterKey] = LETTER_CORRECT;
          } else if (guess.includes(letter)) {
            newLetters[letterKey] = LETTER_PRESENT;
          } else {
            newLetters[letterKey] = LETTER_ABSENT;
          }
        });

        setLetters((prev) => {
          const copy = [...prev];
          copy[step] = newLetters;
          return copy;
        });

        if (currentWord === guess) {
          setIsGameOver(true);
          handleScoreChange();
          setTimeout(() => {
            if (
              prompt('Congratulations! You guessed the word! Would you like to play again? (yes/no)', 'yes') === 'yes'
            ) {
              refreshGame();
            }
          }, 350);
          return;
        }

        setStep((prevStep) => prevStep + 1);
      }
    }
  };

  const increaseSteps = () => {
    setMaxSteps((steps) => steps + 1);
    setWords((words) => [...words, EMPTY]);
    setIsHelpUsed(true);
  };

  const extractLetter = (letterKey: string): string => letterKey.split('.')[0];
  const getLetterKey = (letter: string, index: number): string => `${letter}.${index}`;

  const getLetterClass = (rowIndex: number, colIndex: number, letter: string): string => {
    return letters[rowIndex] ? letters[rowIndex][getLetterKey(letter, colIndex)] : '';
  };

  // Optimize by calculating all letter statuses in one pass
  const letterStatuses = useMemo(() => {
    // Create a map to track the highest priority status for each letter
    // Priority: LETTER_CORRECT > LETTER_PRESENT > LETTER_ABSENT
    const statusMap = new Map<string, string>();

    // Process all letter entries once
    letters.forEach((rowEntries) => {
      Object.entries(rowEntries).forEach(([key, status]) => {
        const letter = extractLetter(key);
        const currentStatus = statusMap.get(letter);

        // Only upgrade status (absent → present → correct)
        if (
          !currentStatus ||
          status === LETTER_CORRECT ||
          (status === LETTER_PRESENT && currentStatus === LETTER_ABSENT)
        ) {
          statusMap.set(letter, status);
        }
      });
    });

    // Create separate lists for each status type
    const correct: Array<string> = [];
    const present: Array<string> = [];
    const absent: Array<string> = [];

    statusMap.forEach((status, letter) => {
      if (status === LETTER_CORRECT) correct.push(letter);
      else if (status === LETTER_PRESENT) present.push(letter);
      else if (status === LETTER_ABSENT) absent.push(letter);
    });

    return {
      [LETTER_CORRECT]: correct.join(' '),
      [LETTER_PRESENT]: present.join(' '),
      [LETTER_ABSENT]: absent.join(' '),
    };
  }, [letters]);

  const correctLetters = letterStatuses[LETTER_CORRECT];
  const presentLetters = letterStatuses[LETTER_PRESENT];
  const absentLetters = letterStatuses[LETTER_ABSENT];

  return (
    <>
      <h1 className='logo text-3xl font-bold animate-bounce my-8'>Wordle</h1>
      <div className='flex flex-col items-center justify-center '>
        <h3 ref={scoreRef} className='text-3xl mb-8'>
          Score {score}
        </h3>
        <div className='grid grid-rows-5 gap-2'>
          {words.map((_, rowIndex) => (
            <div key={rowIndex} className='grid grid-cols-5 gap-2'>
              {words[rowIndex].split('').map((currentLetter, colIndex) => (
                <div
                  key={colIndex}
                  className={`flex justify-center w-12 h-12 border border-white bg-transparent box-border text-2xl/12 ${getLetterClass(
                    rowIndex,
                    colIndex,
                    currentLetter
                  )}`}
                >
                  {currentLetter === '*' ? '' : currentLetter}
                </div>
              ))}
            </div>
          ))}
        </div>

        {step == 4 && !isHelpUsed && (
          <button className='my-4 size-sm animate-pulse' onClick={increaseSteps}>
            Плізкі дай ще одну спробу 😅
          </button>
        )}
        <Keyboard
          keyboardRef={(r) => (keyboardRef.current = r)}
          onChange={handleKeyboardInput}
          onKeyPress={handleKeyPress}
          theme={'hg-theme-default hg-layout-default'}
          layoutName='default'
          layout={{
            default: ['{bksp}', 'й ц у к е н г ш щ з х ї', 'ф і в а п р о л д ж є', 'я ч с м и т ь б ю', '{enter}'],
          }}
          buttonTheme={[
            ...(absentLetters
              ? [
                  {
                    class: 'hg-grey',
                    buttons: absentLetters,
                  },
                ]
              : []),
            ...(presentLetters
              ? [
                  {
                    class: 'hg-yellow',
                    buttons: presentLetters,
                  },
                ]
              : []),
            ...(correctLetters
              ? [
                  {
                    class: 'hg-green',
                    buttons: correctLetters,
                  },
                ]
              : []),
          ]}
        />
      </div>
    </>
  );
};

export default Wordle;
