<script>
    import QuestionModel from "$lib/models/QuestionModel.js";
    import {questionGet, questionPatch} from "$lib/api/QuestionApi.js";
    import {alertError, alertSuccess} from "$lib/alert.js";
    import {onMount} from "svelte";
    import {page} from "$app/state";
    import {getQuestionTypes, getQuestionTypeDisplayName} from "$lib/enums/question-types.js";
    import {getAnswerPolicy, getAnswerPolicyDisplayName} from "$lib/enums/answer-policy.js";
    import {getLabel} from "$lib/enums/label.js";

    const {id} = page.params;
    let question = $state({...new QuestionModel()});
    const types = getQuestionTypes();
    const policies = getAnswerPolicy();

    async function questionUpdate(e) {
        e.preventDefault();

        const response = await questionPatch(question);
        const responseBody = await response.json();

        if (responseBody.status === 200) {
            await alertSuccess("update question success");
        } else {
            await alertError(responseBody.message);
        }
    }

    async function questionDetail() {
        const response = await questionGet(id);
        const responseBody = await response.json();

        if (responseBody.status === 200) {
            question = responseBody.data;
        } else {
            await alertError(responseBody.message);
        }
    }

    onMount(async () => {
        await questionDetail();
    });
</script>

<section class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Question Edit</h2>

    <form onsubmit={questionUpdate}>
        <div class="mb-5">
            <label for="qtype" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
            <select
                    id="qtype"
                    bind:value={question.qtype}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
            >
                {#each types as type}
                    <option value={type} selected={question.qtype === type}>
                        {getQuestionTypeDisplayName(type)}
                    </option>
                {/each}
            </select>
        </div>
        {#if question.qtype === types[0]}
            <div class="mb-5">
                <label for="answer-policy" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Answer Policy</label>
                <select
                        id="answer-policy"
                        bind:value={question.questionAnswerPolicy}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                >
                    {#each policies as policy}
                        <option value={policy} selected={question.questionAnswerPolicy === policy}>
                            {getAnswerPolicyDisplayName(policy)}
                        </option>
                    {/each}
                </select>
            </div>
        {/if}
        <div class="mb-5">
            <label for="stem" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stem</label>
            <input
                    id="stem"
                    type="text"
                    bind:value={question.stem}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
        </div>
        <div class="mb-5">
            <label for="point" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Point</label>
            <input
                    id="point"
                    type="number"
                    bind:value={question.pointsDefault}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
        </div>
        <div class="flex justify-end gap-3 mt-4">
            <button type="submit"
                    class="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg">
                <i class="fas fa-plus-circle mr-2"></i>Save Changes
            </button>
            <a class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
               href="/question">
                Back
            </a>
        </div>
    </form>
</section>