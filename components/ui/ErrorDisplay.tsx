"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorDisplayProps {
  title: string;
  message: string;
  variant?: "default" | "destructive";
  actionLabel?: string;
  onAction?: () => void;
  children?: ReactNode;
}

export function ErrorDisplay({
  title,
  message,
  variant = "default",
  actionLabel = "Go Back",
  onAction = () => window.history.back(),
  children,
}: ErrorDisplayProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant={variant}>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{message}</AlertDescription>
        </Alert>

        {children}

        <Button className="mt-4" onClick={onAction}>
          {actionLabel}
        </Button>
      </CardContent>
    </Card>
  );
}

// Specialized error displays for common scenarios
export function NotFoundError({
  resourceType,
  resourceId,
  onAction,
  actionLabel,
}: {
  resourceType: string;
  resourceId: string;
  onAction?: () => void;
  actionLabel?: string;
}) {
  return (
    <ErrorDisplay
      title={`${resourceType} Not Found`}
      message={`Could not find ${resourceType.toLowerCase()} with ID: ${resourceId}`}
      onAction={onAction}
      actionLabel={actionLabel}
    />
  );
}

export function LoadingError({
  resourceType,
  errorMessage,
  onAction,
  actionLabel,
}: {
  resourceType: string;
  errorMessage: string;
  onAction?: () => void;
  actionLabel?: string;
}) {
  return (
    <ErrorDisplay
      title={`Error Loading ${resourceType}`}
      message={errorMessage}
      variant="destructive"
      onAction={onAction}
      actionLabel={actionLabel}
    />
  );
}
