import { Feedback } from './Feedback/Feedback';
import React, { useState } from 'react';
import { Statistics } from './Statitistics/Statistics';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [values, setValues] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onLeaveFeedback = event => {
    return setValues(prevState => ({
      ...prevState,
      [event]: prevState[event] + 1,
    }));
  };

  const { good, neutral, bad } = values;

  const countTotalFeedback = () => {
    const total = good + neutral + bad;
    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = values;
    return ((good / countTotalFeedback()) * 100).toFixed(1);
  };

  const totalFeedback = countTotalFeedback();
  const percentPositive = countPositiveFeedbackPercentage();
  const options = Object.keys(values);
  // console.log(options)
  return (
    <div className="App">
      <Section title="Please leave feedback">
        <Feedback options={options} onLeaveFeedback={onLeaveFeedback} />
      </Section>
      <Section title="Statistics">
        {totalFeedback !== 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={percentPositive}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};
