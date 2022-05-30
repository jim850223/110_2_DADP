<template>
  <div class="container">
        <table class="table table-striped table-hover">

            <thead class="table">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col" class="col-2">Collection</th>
                    <th scope="col">Floor Price</th>
                    <th scope="col">Avg. Price</th>
                    <th scope="col">1 Day Avg. Price</th>
                    <th scope="col">1 Day Sales</th>
                    <th scope="col">7 Day Avg. Price</th>
                    <th scope="col">7 Day Sales</th>
                    <th scope="col">30 Day Avg. Price</th>
                    <th scope="col">30 Day Sales</th>
                </tr>
            </thead>

            <tbody id='table'>
                <!-- Fullfill the innerHTML with the information of collections -->
            </tbody>

        </table>
    </div>

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-8">
                
                
                <!-- There are 4 lines, the first line of code is the key that I can submit the variable to function without
                refreshing the page. Precisely, I add "onsubmit="return false;" in the end of the line.
                And in the third line, the utility of type="text" and type="submit" are the same
                refer to this 
                https://stackoverflow.com/questions/17433557/how-to-save-user-input-into-a-variable-in-html-and-javascript -->                
                <form class="d-flex" onsubmit="return false;">
                    <input class="form-control me-2" type="text" placeholder="Add New Collection" id="idk">                
                    <button type="text" onclick="addNewCollection(document.getElementById(`idk`).value)">+</button>
                </form>

            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

</script>
