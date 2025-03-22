import * as tf from '@tensorflow/tfjs';
import { load as loadUSE } from '@tensorflow-models/universal-sentence-encoder';

class ModelService {
  private model: any = null;
  private loadPromise: Promise<any> | null = null;

  constructor() {
    tf.enableProdMode();
    tf.ready().then(() => {
      tf.tensor([1, 2, 3]).dispose();
    });
  }

  async loadModel(): Promise<any> {
    if (this.model) {
      return this.model;
    }

    if (this.loadPromise) {
      return this.loadPromise;
    }

    this.loadPromise = import('@tensorflow-models/universal-sentence-encoder')
      .then(module => module.load())
      .then(model => {
        this.model = model;
        return model;
      });

    return this.loadPromise;
  }

  async getEmbedding(text: string): Promise<Float32Array | null> {
    try {
      const model = await this.loadModel();
      const embeddings = await model.embed(text);
      const result = await embeddings.array();
      embeddings.dispose();
      return result[0] as Float32Array;
    } catch (error) {
      console.error('Error generating embeddings:', error);
      return null;
    }
  }
}

export const modelService = new ModelService();