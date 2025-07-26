export type TestStatusType = 'PASSED' | 'FAILED' | 'READY' | 'RUNNING';

export interface TestData {
  projectId: number;
  projectName?: string;
  successRoutingTest?: number;
  successInteractionTest?: number;
  successMappingTest?: number;
  totalRoutingTest?: number;
  totalInteractionTest?: number;
  totalMappingTest?: number;
  projectCreatedDate?: string;
}

export interface DashBoardTestList {
  testId: number;
  projectId: number;
  projectName: string;
  pageName: string;
  testType: string;
  testStatus: string;
}

export interface TestDetail {
  projectName: string;
  projectAdmin: string;
  projectStart: string;
  projectEnd: string;
  testExecutionTime: string;
  description: string;
  testSummary: TestSummary;
  pages: PageArrayProps[];
}

export interface TestSummary {
  totalSuccessTests: number;
  totalFailTests: number;
  interactionSuccessCount: number;
  interactionFailCount: number;
  mappingSuccessCount: number;
  mappingFailCount: number;
  routingSuccessCount: number;
  routingFailCount: number;
}

export interface PageArrayProps {
  pageId: number;
  pageName: string;
}

export interface RoutingTest {
  success: RoutingSuccess[];
  fail: RoutingFail[];
}

export interface RoutingSuccess {
  triggerSelector: string;
  expectedDestination: string;
  actualDestination: string;
}
export interface RoutingFail {
  triggerSelector: string;
  expectedDestination: string;
  actualDestination: string;
  failReason: string;
}

export interface MappingTest {
  matchedComponents: number;
  componentNames: ComponentName[];
  failComponents: FailComponent[];
}

export interface ComponentName {
  componentName: string;
}

export interface FailComponent {
  componentName: string;
  failReason: string;
}

export interface InteractionTest {
  success: InteractionSuccess[];
  fail: InteractionFail[];
}

export interface InteractionSuccess {
  trigger: string;
  actualAction: string;
}
export interface InteractionFail {
  trigger: string;
  expectedAction: string;
  actualAction: string;
  failReason: string;
}

// useGetPageIssue 훅이 반환하는 data.data 에 해당하는 타입
export interface PageIssue {
  routingTest: RoutingTest;
  mappingTest: MappingTest;
  interactionTest: InteractionTest;
}
