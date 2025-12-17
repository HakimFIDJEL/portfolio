// resources/js/pages/tickets/relations/priorities.tsx

import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
    type UniqueIdentifier,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { GripVertical } from 'lucide-react';

interface BaseEntry {
    id: number;
    sort_order: number;
}

interface SortableTableProps<T extends BaseEntry> {
    entries: T[];
    columns: string[];
    handleSort: (entries: T[]) => void;
    renderCells: (entry: T) => React.ReactNode;
    handleRowClick: (entry: T) => void;
}

export function SortableTable<T extends BaseEntry>({
    entries,
    columns,
    handleSort,
    renderCells,
    handleRowClick,
}: SortableTableProps<T>) {
    const [tempEntries, setTempEntries] = React.useState<T[]>(entries);

    React.useEffect(() => {
        setTempEntries(entries);
    }, [entries]);

    const dataIds = React.useMemo<UniqueIdentifier[]>(
        () => tempEntries.map((e) => e.id),
        [tempEntries],
    );

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor),
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);

        if (oldIndex === -1 || newIndex === -1) return;

        const updated = arrayMove(tempEntries, oldIndex, newIndex).map(
            (entry, index) => ({
                ...entry,
                sort_order: index + 1,
            }),
        );

        setTempEntries(updated);
        handleSort(updated);
    }

    function DragHandle({ id }: { id: UniqueIdentifier }) {
        const { attributes, listeners } = useSortable({ id });

        return (
            <Button
                {...attributes}
                {...listeners}
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground"
            >
                <GripVertical className="size-4" />
            </Button>
        );
    }

    function DraggableRow({ entry }: { entry: T }) {
        const { setNodeRef, transform, transition, isDragging } = useSortable({
            id: entry.id,
        });

        return (
            <TableRow
                ref={setNodeRef}
                className="group cursor-pointer"
                data-dragging={isDragging}
                style={{
                    transform: CSS.Transform.toString(transform),
                    transition,
                }}
                onClick={() => handleRowClick(entry)}
            >
                <TableCell>
                    <DragHandle id={entry.id} />
                </TableCell>
                {renderCells(entry)}
            </TableRow>
        );
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
        >
            <Table className="overflow-hidden">
                <TableHeader>
                    <TableRow>
                        <TableHead />
                        {columns.map((col) => (
                            <TableHead key={col}>{col}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tempEntries.length > 0 ? (
                        <SortableContext
                            items={dataIds}
                            strategy={verticalListSortingStrategy}
                        >
                            {[...tempEntries]
                                .sort((a, b) => a.sort_order - b.sort_order)
                                .map((entry) => (
                                    <DraggableRow
                                        key={entry.id}
                                        entry={entry}
                                    />
                                ))}
                        </SortableContext>
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length + 1}
                                className="py-4 text-center"
                            >
                                No data found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </DndContext>
    );
}
