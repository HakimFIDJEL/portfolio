// Components
import { Separator } from "@/Components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/Components/ui/toggle-group";

export function TabStacks({
    setData,
    stackCategories,
    selectedStacks,
    setSelectedStacks,
}) {
    function handleToggleChange(e) {
        const updatedStacks = e;
        setSelectedStacks(updatedStacks);
        setData("stacks", updatedStacks);
    }

    return (
        <>
            <div className="grid gap-4 my-4">
                {stackCategories && stackCategories.length > 0 ? (
                    stackCategories.map((category) => (
                        <div key={category.id}>
                            <h4 className="text-lg font-semibold">
                                {category.label}
                            </h4>
                            <Separator className="mt-1" />

                            <div className="grid gap-4 my-2">
                                {category.stacks &&
                                category.stacks.length > 0 ? (
                                    <ToggleGroup
                                        variant="outline"
                                        type="multiple"
                                        className="flex gap-2 items-start justify-start"
                                        onValueChange={handleToggleChange}
                                        value={selectedStacks}
                                    >
                                        {category.stacks.map((stack) => (
                                            <ToggleGroupItem
                                                value={stack.id.toString()}
                                                aria-label={stack.label}
                                                className="px-6 py-2"
                                                key={stack.id}
                                            >
                                                {stack.label}
                                            </ToggleGroupItem>
                                        ))}
                                    </ToggleGroup>
                                ) : (
                                    <div>No stacks available</div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No categories available</div>
                )}
            </div>
        </>
    );
}
