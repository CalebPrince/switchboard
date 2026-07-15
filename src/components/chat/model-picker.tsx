"use client";

import { MODELS, PROVIDERS, type ProviderId } from "@/lib/ai/models";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ModelPicker({
  providerId,
  modelId,
  onChange,
  disabled,
}: {
  providerId: ProviderId;
  modelId: string;
  onChange: (providerId: ProviderId, modelId: string) => void;
  disabled?: boolean;
}) {
  const value = `${providerId}:${modelId}`;

  return (
    <Select
      value={value}
      onValueChange={(next) => {
        const [nextProvider, nextModel] = (next as string).split(":");
        onChange(nextProvider as ProviderId, nextModel);
      }}
      disabled={disabled}
    >
      <SelectTrigger size="sm" className="w-56">
        <SelectValue placeholder="Choose a model" />
      </SelectTrigger>
      <SelectContent>
        {PROVIDERS.map((provider) => (
          <SelectGroup key={provider.id}>
            <SelectLabel>{provider.label}</SelectLabel>
            {MODELS.filter((m) => m.providerId === provider.id).map((m) => (
              <SelectItem key={m.modelId} value={`${m.providerId}:${m.modelId}`}>
                {m.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
