import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
} from "@/Components/ui/alert-dialog";

export function AppAlert({ isDialogOpen, dismissDelete, confirmDelete }) {
    return (
        <AlertDialog open={isDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the element.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={dismissDelete}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDelete}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}