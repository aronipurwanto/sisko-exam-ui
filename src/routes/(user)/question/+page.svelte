<script>
    import {questionDelete, questionGetList} from "$lib/api/QuestionApi.js";
    import {alertConfirm, alertError, alertSuccess} from "$lib/alert.js";
    import {onMount} from "svelte";

    let questions = $state([]);

    async function questionList() {
        try {
            questions = await questionGetList();
        } catch (err) {
            await alertError(err.message);
        }
    }

    async function questionRemove(id) {
        if (!await alertConfirm('are you sure want to delete this question?')) return;

        try {
            await questionDelete(id);
            await alertSuccess();
            await questionList();
        } catch (err) {
            await alertError(err.message);
        }
    }

    onMount(async () => {
        await questionList();
    });
</script>

<section class="p-6 flex-1">
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Questions List</h2>
        <a class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
           href="/question/add">
            ➕ Add Question
        </a>
    </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th class="px-6 py-3 text-left">#</th>
                <th class="px-6 py-3 text-left">ID</th>
                <th class="px-6 py-3 text-left">Type</th>
                <th class="px-6 py-3 text-left">Answer Policy</th>
                <th class="px-6 py-3 text-left">Stem</th>
                <th class="px-6 py-3 text-left">Point Default</th>
                <th class="px-6 py-3 text-center">Actions</th>
            </tr>
            </thead>
            <tbody>
            {#each questions as question, index}
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index+1}</th>
                    <td class="px-6 py-3">{question.id}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{question.qtype}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{question.questionAnswerPolicy}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{question.stem}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{question.pointsDefault}</td>
                    <td class="px-6 py-3 text-center space-x-2">
                        <a class="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded"
                           href="/question/{question.id}">
                            Details
                        </a>
                        <a class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded"
                           href="/question/{question.id}/edit">
                            Edit
                        </a>
                        <button onclick={() => questionRemove(question.id)}
                                class="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded">
                            <i class="fas fa-trash-alt mr-2"></i> Delete
                        </button>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</section>