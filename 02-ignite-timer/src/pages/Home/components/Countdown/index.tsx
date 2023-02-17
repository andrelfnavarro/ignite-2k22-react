import { differenceInSeconds } from 'date-fns';
import { useContext, useEffect } from 'react';
import { CyclesContext } from '../../../../contexts/CyclesContext';
import { CountdownContainer, Separator } from './styles';

export const Countdown = () => {
  const {
    activeCycle,
    activeCycleId,
    markActiveCycleAsFinished,
    totalSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutes * 60 : 0;

  const currentSeconds = activeCycle ? totalSeconds - totalSecondsPassed : 0;

  const currentMinutesLeft = Math.floor(currentSeconds / 60);
  const currentSecondsLeft = currentSeconds % 60;

  const formattedCurrentMinutesLeft = String(currentMinutesLeft).padStart(
    2,
    '0'
  );
  const formattedCurrentSecondsLeft = String(currentSecondsLeft).padStart(
    2,
    '0'
  );

  useEffect(() => {
    if (!activeCycle) return;

    document.title = `${formattedCurrentMinutesLeft}:${formattedCurrentSecondsLeft}`;
  }, [formattedCurrentMinutesLeft, formattedCurrentSecondsLeft]);

  useEffect(() => {
    if (!activeCycle) return;

    const interval = setInterval(() => {
      const secondsPassed = differenceInSeconds(
        new Date(),
        new Date(activeCycle.startedAt)
      );

      if (secondsPassed >= totalSeconds) {
        clearInterval(interval);

        markActiveCycleAsFinished();
        setSecondsPassed(totalSeconds);

        return;
      }

      setSecondsPassed(secondsPassed);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeCycle, totalSeconds, activeCycleId, markActiveCycleAsFinished]);

  return (
    <CountdownContainer>
      <span>{formattedCurrentMinutesLeft[0]}</span>
      <span>{formattedCurrentMinutesLeft[1]}</span>
      <Separator>:</Separator>
      <span>{formattedCurrentSecondsLeft[0]}</span>
      <span>{formattedCurrentSecondsLeft[1]}</span>
    </CountdownContainer>
  );
};
