import CircleProgressBar from '@/components/ui/progressBar/CircleProgressBar';
import { colors } from '@/styles/theme/colors';
import { calculatePercentage } from '@/utils/useCalculateTestPercentage';

interface TestRatingBarsProps {
  testSummary: {
    totalSuccessTests: number;
    totalFailTests: number;
    routingSuccessCount: number;
    routingFailCount: number;
    interactionSuccessCount: number;
    interactionFailCount: number;
    mappingSuccessCount: number;
    mappingFailCount: number;
  };
}

export default function TestRatingBars({ testSummary }: TestRatingBarsProps) {
  const {
    totalSuccessTests,
    totalFailTests,
    routingSuccessCount,
    routingFailCount,
    interactionSuccessCount,
    interactionFailCount,
    mappingSuccessCount,
    mappingFailCount
  } = testSummary;

  return (
    <section className="flex gap-6 max-sm:flex-col max-sm:items-center max-sm:gap-6">
      <div className="bg-white/80 backdrop-blur-lg ring-1 ring-white/40 shadow-md rounded-2xl basis-1/4 w-full px-2 py-6 max-sm:basis-auto max-sm:w-1/2 flex items-center justify-center">
        <CircleProgressBar
          value={calculatePercentage(totalSuccessTests, totalSuccessTests + totalFailTests)}
          label="TOTAL"
          color="#E48989"
        />
      </div>
      <div className="flex justify-around items-center bg-white/80 backdrop-blur-lg ring-1 ring-white/40 shadow-md rounded-2xl basis-3/4 w-full px-2 py-6 gap-4">
        <CircleProgressBar
          value={calculatePercentage(routingSuccessCount, routingSuccessCount + routingFailCount)}
          label="ROUTING"
          color={colors.teal_1}
        />
        <CircleProgressBar
          value={calculatePercentage(interactionSuccessCount, interactionSuccessCount + interactionFailCount)}
          label="INTERACTION"
          color={colors.purple_1}
        />
        <CircleProgressBar
          value={calculatePercentage(mappingSuccessCount, mappingSuccessCount + mappingFailCount)}
          label="COMPONENT"
          color={colors.brown_1}
        />
      </div>
    </section>
  );
}
