export type StoredImage = {
  id: string;
  userId: string;
  base64: string | null;
  uri: string;
  metadata: {
    width: number;
    height: number;
    fileSize?: number;
    createdAt: string;
  };
};