// Loaded directly from the CDN as a native browser ES module — this
// deliberately bypasses Vite/esbuild's dependency pre-bundling, which
// breaks onnxruntime-web's internal backend registration (the
// `registerBackend` crash) because that vendor bundle relies on
// top-level await that Vite's dev optimizer doesn't preserve.

type ProgressCallback = (status: { status: string; progress?: number; file?: string }) => void;

let transformersPromise: Promise<any> | null = null;

function loadTransformers(): Promise<any> {
  if (!transformersPromise) {
    transformersPromise = import(
      /* @vite-ignore */
      'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2'
    ).then((mod) => {
      mod.env.allowLocalModels = false;
      mod.env.useBrowserCache = true;
      return mod;
    });
  }
  return transformersPromise;
}

class PipelineSingleton {
  private static sentimentInstance: Promise<any> | null = null;
  private static nerInstance: Promise<any> | null = null;
  private static embeddingInstance: Promise<any> | null = null;

  static async getSentiment(onProgress?: ProgressCallback) {
    if (!this.sentimentInstance) {
      const { pipeline } = await loadTransformers();
      this.sentimentInstance = pipeline(
        'sentiment-analysis',
        'Xenova/distilbert-base-uncased-finetuned-sst-2-english',
        { progress_callback: onProgress },
      );
    }
    return this.sentimentInstance;
  }

  static async getNER(onProgress?: ProgressCallback) {
    if (!this.nerInstance) {
      const { pipeline } = await loadTransformers();
      this.nerInstance = pipeline(
        'token-classification',
        'Xenova/bert-base-NER',
        { progress_callback: onProgress },
      );
    }
    return this.nerInstance;
  }

  static async getEmbedder(onProgress?: ProgressCallback) {
    if (!this.embeddingInstance) {
      const { pipeline } = await loadTransformers();
      this.embeddingInstance = pipeline(
        'feature-extraction',
        'Xenova/all-MiniLM-L6-v2',
        { progress_callback: onProgress },
      );
    }
    return this.embeddingInstance;
  }
  private static qaInstance: Promise<any> | null = null;
  static async getQA(onProgress?: ProgressCallback) {
    if (!this.qaInstance) {
      const { pipeline } = await loadTransformers();
      this.qaInstance = pipeline(
        'question-answering',
        'Xenova/distilbert-base-cased-distilled-squad',
        { progress_callback: onProgress },
      );
    }
    return this.qaInstance;
  }

  private static generatorInstance: Promise<any> | null = null;

  static async getGenerator(onProgress?: ProgressCallback) {
    if (!this.generatorInstance) {
      const { pipeline } = await loadTransformers();
      this.generatorInstance = pipeline(
        'text2text-generation',
        'Xenova/LaMini-Flan-T5-248M',
        { progress_callback: onProgress },
      );
    }
    return this.generatorInstance;
  }
}



export default PipelineSingleton;