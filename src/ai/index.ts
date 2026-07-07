import type { AIVideoProvider } from "./types";
import { EvolinkProvider } from "./providers/evolink";
import { KieProvider } from "./providers/kie";

export type ProviderType = "evolink" | "kie";

const providers: Map<ProviderType, AIVideoProvider> = new Map();
const providerTypes = ["evolink", "kie"] as const;

export function resolveProviderType(
  configuredProvider: string | undefined,
  fallbackProvider: ProviderType = "evolink"
): ProviderType {
  const provider = configuredProvider || fallbackProvider;

  if (!providerTypes.includes(provider as ProviderType)) {
    throw new Error(
      `Invalid DEFAULT_AI_PROVIDER: ${provider}. Supported values: evolink, kie`
    );
  }

  return provider as ProviderType;
}

function requireProviderApiKey(type: ProviderType): string {
  const envKey = type === "evolink" ? "EVOLINK_API_KEY" : "KIE_API_KEY";
  const apiKey = process.env[envKey];

  if (!apiKey) {
    throw new Error(
      `Missing ${envKey}. DEFAULT_AI_PROVIDER=${type} requires ${envKey} to be set in the environment.`
    );
  }

  return apiKey;
}

export function getProvider(type: ProviderType): AIVideoProvider {
  if (providers.has(type)) return providers.get(type)!;

  let provider: AIVideoProvider;
  switch (type) {
    case "evolink":
      provider = new EvolinkProvider(requireProviderApiKey(type));
      break;
    case "kie":
      provider = new KieProvider(requireProviderApiKey(type));
      break;
    default:
      throw new Error(`Unknown provider: ${type}`);
  }

  providers.set(type, provider);
  return provider;
}

export function getDefaultProvider(): AIVideoProvider {
  const type = resolveProviderType(process.env.DEFAULT_AI_PROVIDER, "evolink");
  return getProvider(type);
}

export * from "./types";
