"use client";

import { XIcon, FileText } from 'lucide-react';
import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTrans } from "@/lib/translation";
import { useState, useEffect } from 'react';
import type { Attachment } from '@/types';

interface FileUploadProps {
    defaultAttachment?: Attachment | null;
    onFileChange?: (file: File | null) => void;
    labelKey: string;
    descriptionKey: string;
    maxSizeMB: number;
    allowedTypes: string[];
}

export default function FileUpload({
    defaultAttachment = null,
    onFileChange,
    descriptionKey,
    maxSizeMB,
    allowedTypes,
}: Readonly<FileUploadProps>) {
    const __ = useTrans();
    const ALLOWED_TYPES_SET = new Set(allowedTypes);

    const [{ files }, { openFileDialog, removeFile, getInputProps }] =
        useFileUpload({
            accept: allowedTypes.join(','),
        });

    const [currentAttachment, setCurrentAttachment] = useState<Attachment | null>(defaultAttachment);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const validateFile = (file: File): boolean => {
        if (file.size > maxSizeMB * 1024 * 1024) {
            toast.error(
                __('settings.pages.profile.info_form.file_too_big_title'),
                {
                    description: __(
                        'settings.pages.profile.info_form.file_too_big_description',
                    ).replace(':size', String(maxSizeMB)),
                },
            );
            return false;
        }

        if (!ALLOWED_TYPES_SET.has(file.type)) {
            toast.error(
                __('settings.pages.profile.info_form.file_error_type') || 'Invalid file type',
                {
                    description:
                        __('settings.pages.profile.info_form.file_error_type_description') ||
                        'Allowed formats: ' + allowedTypes.join(', '),
                },
            );
            return false;
        }

        return true;
    };

    const handleRemoveFile = () => {
        // Supprime le fichier de l'état local (si nouveau fichier uploadé)
        if (uploadedFile) {
            removeFile(files[0]?.id);
            setUploadedFile(null);
        }
        // Supprime l'attachement par défaut (existant en base)
        setCurrentAttachment(null);
        
        // Informe le formulaire parent pour envoyer NULL au backend
        if (onFileChange) {
            onFileChange(null);
        }
    };

    useEffect(() => {
        if (!files.length) return;

        const file = files[0].file as File;
        if (!validateFile(file)) {
            removeFile(files[0].id);
            return;
        }

        setUploadedFile(file);
        setCurrentAttachment(null); // Un nouveau fichier remplace l'ancien par défaut

        if (onFileChange) {
            onFileChange(file);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files]);
    
    const displayAttachment = uploadedFile || currentAttachment;
    const fileName = uploadedFile?.name ?? currentAttachment?.file_name;
    const fileExtension = fileName ? fileName.split('.').pop()?.toUpperCase() : null;

    return (
        <div className="flex flex-col gap-2">
            <div className="relative flex items-center gap-3 rounded-md border border-input p-3">
                {displayAttachment ? (
                    <>
                        <FileText className="size-5 shrink-0 text-primary" />
                        <span className="truncate text-sm font-medium">
                            {fileName}
                        </span>
                        <span className="ml-auto text-xs font-semibold text-muted-foreground mr-8">
                            {fileExtension}
                        </span>
                        <Button
                            type="button"
                            onClick={handleRemoveFile}
                            variant="secondary"
                            size="icon"
                            className="absolute right-1 size-7 rounded-full text-muted-foreground hover:text-red-500"
                        >
                            <XIcon className="size-4" />
                        </Button>
                    </>
                ) : (
                    <div className="flex w-full items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                            {__(descriptionKey).replace(':size', String(maxSizeMB))}
                        </span>
                        <Button
                            type="button"
                            onClick={openFileDialog}
                            variant="secondary"
                            size="sm"
                        >
                            {__('settings.pages.profile.info_form.buttons.upload_file')}
                        </Button>
                    </div>
                )}
            </div>
            

            <input {...getInputProps()} className="sr-only" />
        </div>
    );
}