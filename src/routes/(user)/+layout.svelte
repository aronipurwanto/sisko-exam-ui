<script>
    import Navbar from "$lib/component/layout/Navbar.svelte";
    import Sidebar from "$lib/component/layout/Sidebar.svelte";
    import Footer from "$lib/component/layout/Footer.svelte";

	let { children } = $props();
</script>

<div class="flex flex-col min-h-screen">
    <Navbar/>

    <div class="flex flex-1">
        <Sidebar/>
        <div class="container m-4">
            {@render children()}
        </div>
    </div>

    <Footer/>
</div>
