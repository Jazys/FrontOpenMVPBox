interface app {
    id: number;
    type: number;
    installScript: string;
    enable: string;
    pathLocalDirStack: string;
    title: string;
    description: string;
    categories: string[];
    logo: string;
    video: [];
    tutorials: [];
    repository: {};
    env:[];
    userId?:string;
}