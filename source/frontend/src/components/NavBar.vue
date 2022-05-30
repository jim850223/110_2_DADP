<template>
    <nav class="navbar navbar-dark fixed-top bg-dark" aria-label="First navbar example">
        <div class="container-fluid">
            <router-link class="navbar-brand" style="font-weight: 900;" to="/">Open List</router-link>
            <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample01"
                aria-controls="navbarsExample01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!--div class="collapse navbar-collapse" id="navbarsExample01">
                <ul class="navbar-nav me-auto mb-2">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Your Groups</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Top NFTs</a>
                    </li>
                </ul>
            </div-->

            <div class="collapse navbar-collapse" id="navbarsExample01">
                <ul class="navbar-nav me-auto mb-2 navbar-nav-right">
                    <li class="nav-item">
                        <router-link class="nav-link active" aria-current="page" href="#" to="/signup">Sign Up</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link active" aria-current="page" href="#" to="/login">Log In</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>