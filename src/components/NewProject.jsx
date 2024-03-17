import { useRef } from "react";

import Input from "./Input";
import Modal from './Modal';

export default function NewProject({ onNewProjectSave, onCancelProject }) {
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();
    const modal = useRef();

    function handleSave() {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;

        // input validation
        if(enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDueDate.trim() === '') {
            modal.current.open();
            return;
        }

        onNewProjectSave({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate
        })
    }


    return (
    <>
        <Modal ref={modal} buttonCaption='Close'>
            <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input!</h2>
            <p className="text-stone-600 mb-4">Please make sure the Title, Description or Due Date is not empty.</p>
        </Modal>
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li>
                    <button onClick={onCancelProject} className="text-stone-800 hover:text-stone-950">Cancel</button>
                </li>
                <li>
                    <button onClick={handleSave} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button>
                </li>
            </menu>
            <div >
                <Input ref={title} label='Title' type='text' />
                <Input ref={description} label='Description' textarea />
                <Input ref={dueDate} label='Due Date' type='date' />
            </div>
    </div>
    </>
    )
}