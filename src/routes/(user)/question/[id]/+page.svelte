<script>
    import QuestionModel from "$lib/models/QuestionModel.js";
    import {questionGet} from "$lib/api/QuestionApi.js";
    import {alertError} from "$lib/alert.js";
    import {onMount} from "svelte";
    import {page} from "$app/state";
    import QuestionOptionModel from "$lib/models/QuestionOptionModel.js";

    const {id} = page.params;
    let question = $state({...new QuestionModel()});
    let questionOptions = $state([{...new QuestionOptionModel()}])

    async function questionDetail() {
        try {
            question = await questionGet(id);
            console.log(question);
        } catch (err) {
            await alertError(err.message);
        }
    }

    onMount(async () => {
        await questionDetail();
    });
</script>

<section class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Question Details</h2>

    <form onsubmit={questionAdd}>
        <div class="mb-5">
            <label for="qtype" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
            <input
                    id="qtype"
                    type="text"
                    bind:value={question.qtype}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    readonly
            />
        </div>
        {#if question.qtype === 'MCO'}
            <div class="mb-5">
                <label for="answer-policy" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Answer Policy</label>
                <input
                        id="answer-policy"
                        type="text"
                        bind:value={question.questionAnswerPolicy}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        readonly
                />
            </div>
        {/if}
        <div class="mb-5">
            <label for="stem" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stem</label>
            <input
                    id="stem"
                    type="text"
                    bind:value={question.stem}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    readonly
            />
        </div>
        <div class="mb-5">
            <label for="point" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Point</label>
            <input
                    id="point"
                    type="number"
                    bind:value={question.pointsDefault}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    readonly
            />
        </div>
        {#each questionOptions as questionOption, i}
            <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-5">
                <h5 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">MCO {questionOption.label || i + 1}</h5>
                <div class="mb-5">
                    <label for="label-{i}" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Label</label>
                    <input
                            id="label-{i}"
                            bind:value={questionOption.label}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            readonly
                    >
                </div>
                <div class="mb-5">
                    <label for="content-{i}" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
                    <input
                            id="content-{i}"
                            type="text"
                            bind:value={questionOption.content}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            readonly
                    />
                </div>
                <div class="mb-5">
                    <label for="correct-{i}" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correct</label>
                    <input
                            id="correct-{i}"
                            bind:value={questionOption.correct}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            readonly
                    >
                </div>
                <div class="mb-5">
                    <label for="orderIndex-{i}" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Order Index</label>
                    <input
                            id="orderIndex-{i}"
                            type="number"
                            bind:value={questionOption.orderIndex}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            readonly
                    />
                </div>
            </div>
        {/each}
        <div class="flex justify-end gap-3 mt-4">
            <a class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
               href="/question">
                Back
            </a>
        </div>
    </form>
</section>