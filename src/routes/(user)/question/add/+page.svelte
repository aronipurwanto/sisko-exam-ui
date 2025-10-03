<script>
    import QuestionModel from "$lib/models/QuestionModel.js";
    import QuestionOptionModel from "$lib/models/QuestionOptionModel.js";
    import {questionPost} from "$lib/api/QuestionApi.js";
    import {alertError, alertSuccess} from "$lib/alert.js";
    import {goto} from "$app/navigation";
    import {getQuestionTypes, getQuestionTypeDisplayName} from "$lib/enums/question-types.js";
    import {getAnswerPolicy, getAnswerPolicyDisplayName} from "$lib/enums/answer-policy.js";
    import {getLabel} from "$lib/enums/label.js";
    import {getBooleanEnum, getBooleanEnumDisplayName} from "$lib/enums/boolean.js";
    import {questionOptionListPost} from "$lib/api/QuestionOptionApi.js";

    let question = $state({...new QuestionModel()});
    let questionOptions = $state([{...new QuestionOptionModel()}]);

    const types = getQuestionTypes();
    const policies = getAnswerPolicy();
    const labels = getLabel();
    const booleans = getBooleanEnum();

    async function questionAdd() {
        try {
            question = await questionPost(question);
        } catch (err) {
            await alertError(err.message);
        }

        if (question.qtype === types[0]) {
            const qid = question.id;

            // isi questionId untuk setiap option
            questionOptions = questionOptions.map(opt => ({
                ...opt,
                questionId: question.id,
            }));
            await alertSuccess("save question success");
        } else {
            await alertSuccess("save question success");
            await goto('/question');
        }
    }

    async function questionOptionAdd() {
        try {
            questionOptions = await questionOptionListPost(questionOptions);
            await alertSuccess("save question option success");
            await goto("/question");
        } catch (err) {
            await alertError(err.message);
        }
    }

    function addOption(e) {
        e.preventDefault();

        questionOptions = [
            ...questionOptions,
            {...new QuestionOptionModel()}
        ];
    }

    function removeLastOption() {
        if (questionOptions.length > 1) { // misalnya jangan hapus kalau tinggal 1
            questionOptions = questionOptions.slice(0, -1);
        }
    }

    async function questionForm(event) {
        event.preventDefault();
        await questionAdd();
        if (question.qtype === types[0]) {
            await questionOptionAdd();
        }
    }
</script>

<section class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Question Add</h2>

    <form onsubmit={questionForm}>
        <div class="mb-5">
            <label for="qtype" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
            <select
                    id="qtype"
                    bind:value={question.qtype}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
            >
                <option value="" disabled>select type</option>
                {#each types as type}
                    <option value={type}>
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
                    <option value="" disabled>select policy</option>
                    {#each policies as policy}
                        <option value={policy}>
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
        {#if question.qtype === types[0]}
            {#each questionOptions as questionOption, i}
                <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-5">
                    <h5 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">MCO {questionOption.label || i + 1}</h5>
                    <div class="mb-5">
                        <label for="label-{i}" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Label</label>
                        <select
                                id="label-{i}"
                                bind:value={questionOption.label}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                        >
                            <option value="" disabled>select label</option>
                            {#each labels as label}
                                <option value={label}>
                                    {label}
                                </option>
                            {/each}
                        </select>
                    </div>
                    <div class="mb-5">
                        <label for="content-{i}" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
                        <input
                                id="content-{i}"
                                type="text"
                                bind:value={questionOption.content}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div class="mb-5">
                        <label for="correct-{i}" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correct</label>
                        <select
                                id="correct-{i}"
                                bind:value={questionOption.correct}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="" disabled>select correct</option>
                            {#each booleans as boolean}
                                <option value={boolean}>
                                    {getBooleanEnumDisplayName(boolean)}
                                </option>
                            {/each}
                        </select>
                    </div>
                    <div class="mb-5">
                        <label for="orderIndex-{i}" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Order Index</label>
                        <input
                                id="orderIndex-{i}"
                                type="number"
                                bind:value={questionOption.orderIndex}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                </div>
            {/each}
            <div class="flex gap-3 mt-4 justify-start">
                <button
                        onclick={addOption}
                        type="button"
                        class="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    + Add Option
                </button>
                <button
                        onclick={removeLastOption}
                        type="button"
                        class="mt-5 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                    – Remove Option
                </button>
            </div>
        {/if}
        <div class="flex justify-end gap-3 mt-4">
            <button type="submit"
                    class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                <i class="fas fa-plus-circle mr-2"></i>Save
            </button>
            <a class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
               href="/question">
                Back
            </a>
        </div>
    </form>
</section>