"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { filters } from "fabric";
import { useCanvas } from "@/context/context";

const FILTER_CONFIGS = [
  {
    key: "brightness",
    label: "Brightness",
    min: -100,
    max: 100,
    step: 1,
    defaultValue: 0,
    filterClass: filters.Brightness,
    valueKey: "brightness",
    transform: (value) => value / 100,
  },
  {
    key: "contrast",
    label: "Contrast",
    min: -100,
    max: 100,
    step: 1,
    defaultValue: 0,
    filterClass: filters.Contrast,
    valueKey: "contrast",
    transform: (value) => value / 100,
  },
  {
    key: "saturation",
    label: "Saturation",
    min: -100,
    max: 100,
    step: 1,
    defaultValue: 0,
    filterClass: filters.Saturation,
    valueKey: "saturation",
    transform: (value) => value / 100,
  },
  {
    key: "vibrance",
    label: "Vibrance",
    min: -100,
    max: 100,
    step: 1,
    defaultValue: 0,
    filterClass: filters.Vibrance,
    valueKey: "vibrance",
    transform: (value) => value / 100,
  },
  {
    key: "blur",
    label: "Blur",
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 0,
    filterClass: filters.Blur,
    valueKey: "blur",
    transform: (value) => value / 100,
  },
  {
    key: "hue",
    label: "Hue",
    min: -180,
    max: 180,
    step: 1,
    defaultValue: 0,
    filterClass: filters.HueRotation,
    valueKey: "rotation",
    transform: (value) => value * (Math.PI / 180),
    suffix: "°",
  },
  {
    key: "noise",
    label: "Noise",
    min: 0,
    max: 1000,
    step: 1,
    defaultValue: 0,
    filterClass: filters.Noise,
    valueKey: "noise",
    transform: (value) => value,
  },
  {
    key: "pixelate",
    label: "Pixelate",
    min: 1,
    max: 100,
    step: 1,
    defaultValue: 1,
    filterClass: filters.Pixelate,
    valueKey: "blocksize",
    transform: (value) => value,
  },
];

const DEFAULT_VALUES = FILTER_CONFIGS.reduce((acc, config) => {
  acc[config.key] = config.defaultValue;
  return acc;
}, {});

export function AdjustControls() {
  const defaultValues = useMemo(() => ({ ...DEFAULT_VALUES }), []);
  const [filterValues, setFilterValues] = useState(defaultValues);
  const { canvasEditor } = useCanvas();

  const getActiveImage = () => {
    if (!canvasEditor) return null;
    const activeObject = canvasEditor.getActiveObject();
    if (activeObject && activeObject.type === "image") return activeObject;
    const objects = canvasEditor.getObjects();
    return objects.find((obj) => obj.type === "image") || null;
  };

  const applyFilters = (newValues) => {
    const imageObject = getActiveImage();
    if (!imageObject) return;

    try {
      const filtersToApply = [];

      FILTER_CONFIGS.forEach((config) => {
        const value = newValues[config.key];
        if (value !== config.defaultValue) {
          const transformedValue = config.transform(value);
          filtersToApply.push(
            new config.filterClass({
              [config.valueKey]: transformedValue,
            })
          );
        }
      });

      imageObject.filters = filtersToApply;
      imageObject.applyFilters();
      imageObject.set("dirty", true);
      canvasEditor.requestRenderAll();

      // Ensure filter changes are treated as modifications for autosave listeners.
      canvasEditor.fire("object:modified", { target: imageObject });
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const handleValueChange = (filterKey, value) => {
    const newValues = {
      ...filterValues,
      [filterKey]: Array.isArray(value) ? value[0] : value,
    };
    setFilterValues(newValues);
    applyFilters(newValues);
  };

  const resetFilters = () => {
    setFilterValues(defaultValues);
    applyFilters(defaultValues);
  };

  const extractFilterValues = (imageObject) => {
    if (!imageObject?.filters?.length) return DEFAULT_VALUES;

    const extractedValues = { ...DEFAULT_VALUES };

    imageObject.filters.forEach((filter) => {
      const config = FILTER_CONFIGS.find(
        (c) => c.filterClass.name === filter.constructor.name
      );
      if (config) {
        const filterValue = filter[config.valueKey];
        if (config.key === "hue") {
          extractedValues[config.key] = Math.round(
            filterValue * (180 / Math.PI)
          );
        } else if (config.key === "noise" || config.key === "pixelate") {
          extractedValues[config.key] = filterValue;
        } else {
          extractedValues[config.key] = Math.round(filterValue * 100);
        }
      }
    });

    return extractedValues;
  };

  useEffect(() => {
    if (!canvasEditor) return;

    const syncValuesFromActiveImage = () => {
      const imageObject = getActiveImage();
      if (!imageObject) {
        setFilterValues(defaultValues);
        return;
      }

      const existingValues = extractFilterValues(imageObject);
      setFilterValues(existingValues);
    };

    syncValuesFromActiveImage();

    canvasEditor.on("selection:created", syncValuesFromActiveImage);
    canvasEditor.on("selection:updated", syncValuesFromActiveImage);
    canvasEditor.on("selection:cleared", syncValuesFromActiveImage);
    canvasEditor.on("object:added", syncValuesFromActiveImage);

    return () => {
      canvasEditor.off("selection:created", syncValuesFromActiveImage);
      canvasEditor.off("selection:updated", syncValuesFromActiveImage);
      canvasEditor.off("selection:cleared", syncValuesFromActiveImage);
      canvasEditor.off("object:added", syncValuesFromActiveImage);
    };
  }, [canvasEditor, defaultValues]);

  if (!canvasEditor) {
    return (
      <div className="p-4">
        <p className="text-white/70 text-sm">
          Load an image to start adjusting
        </p>
      </div>
    );
  }

  const activeImage = getActiveImage();
  if (!activeImage) {
    return (
      <div className="p-4">
        <p className="text-white/70 text-sm">
          Select an image to adjust filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-white">Image Adjustments</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="text-white/70 hover:text-white"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      {FILTER_CONFIGS.map((config) => (
        <div key={config.key} className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm text-white">{config.label}</label>
            <span className="text-xs text-white/70">
              {filterValues[config.key]}
              {config.suffix || ""}
            </span>
          </div>
          <Slider
            value={[filterValues[config.key]]}
            onValueChange={(value) => handleValueChange(config.key, value)}
            min={config.min}
            max={config.max}
            step={config.step}
            className="w-full"
          />
        </div>
      ))}

      <div className="mt-6 p-3 bg-slate-700/50 rounded-lg">
        <p className="text-xs text-white/70">
          Adjustments are applied in real-time. Use the Reset button to restore
          original values.
        </p>
      </div>
    </div>
  );
}
