<script>
    export let user;
</script>

<style>
    p {
        margin-left: 12px;
    }

    img {
        width: 24px;
        height: 24px;
        object-fit: cover;
        border-radius: 50%;
    }
</style>

<div>
    <img src={user.imageURL} alt="" />
    <p>{user.name}</p>
</div>