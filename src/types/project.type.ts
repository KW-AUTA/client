export type ProjectStatusType = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'ERROR' | string;

export interface ProjectListData {
  projectId: number;
  projectAdmin: string;
  projectName: string;
  projectEnd: string;
  projectCreatedDate: string;
  projectStatus: ProjectStatusType;
  testRate: number;
}

export interface ProjectDetailData {
  projectInfo: {
    projectName: string;
    projectAdmin?: string;
    projectStatus: ProjectStatusType;
    description: string;
    projectCreatedDate: string;
    projectEnd: string;
    testExecutionTime: string;
  };
  uiInfo?: {
    score: number | null;
    uiTests: Array<{
      UIPageUrl: string;
      UIDescription: string;
    }>;
  };
  testSummary?: {
    totalRoutingTest: number;
    totalInteractionTest: number;
    totalMappingTest: number;
  };
  pages?: Array<{
    pageName: string;
    pageBaseUrl: string;
  }>;
  figmaInfo: {
    rootFigmaPage: string;
    fileName: string;
    figmaUrl: string;
    serviceUrl: string;
  };
}

export interface ProjectsParams {
  projectName?: string;
  sortBy?: string;
  cursor?: number | null;
}

export interface GenerateProject {
  projectName: string;
  expectedTestExecution: string;
  projectEnd: string;
  description: string;
  figmaFile: File | null;
  figmaUrl: string;
  serviceUrl: string;
  rootFigmaPage: string;
  administrator?: string;
  fileName?: string | null;
}
