export type RequiredRegion = {
  id: string;
  start: number;   // seconds
  end: number;     // seconds
  label?: string;  // optional
};

export type Episode = {
  id: string;
  title: string;
  mediaFile: string;                   // just the file name, e.g. "sample.mp4"
  requiredRegions: RequiredRegion[];   // [] = a list of them
};
