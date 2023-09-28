const loadContent = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const content = data.data;
    handleTabs(content);
}

// phtube Tabs showing
const handleTabs = (content) => {
    const tabContainer = document.getElementById('tab-container');
    content.forEach((content) => {
        const tabDiv = document.createElement('div');
        tabDiv.innerHTML = `
        <a onclick="getContentData('${content.category_id}')" class="tab bg-[#DEDEDE] text-[#5D5D5D] rounded-md mr-5 mt-5">${content.category} </a>
        `;

        tabContainer.appendChild(tabDiv);
    });

}

const getContentData = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();

    handleContentCard(data);

}

// phtube content showing
const handleContentCard = (data) => {

    const contentData = data.data;
    const contentCardCon = document.getElementById('content-card-con');

    contentCardCon.textContent = '';

    const noContent = document.getElementById('no-content');
    if (contentData.length <= 0) {
        noContent.classList.remove('hidden');
    } else {
        noContent.classList.add('hidden');
    }


    document.getElementById('sort-button').addEventListener('click', function () {
        contentData.sort((a, b) => {
            const viewsA = parseFloat(a.others.views.slice(0, -1) * 1000);
            const viewsB = parseFloat(b.others.views.slice(0, -1) * 1000);
            return viewsB - viewsA;
        });
        handleContentCard({ data: contentData });
    });


    contentData.forEach((contentData) => {

        const date = parseInt(contentData.others.posted_date)
        console.log(date)
        const hours = Math.floor(date / 3600);
        const minutes = Math.floor((date % 3600) / 60);
        const setTime = `${hours} hrs ${minutes} min ago`;

        const contentDiv = document.createElement('div');
        contentDiv.classList = `card bg-base-100 p-0`;
        contentDiv.innerHTML = `
        <figure class="flex flex-col relative">
        <img class="w-full h-[200px] rounded-lg " src="${contentData.thumbnail}" />
        <h2 class="${!isNaN(date) ? 'bg-black' : ''} p-2 text-white  rounded-md absolute right-3 bottom-3">
        ${!isNaN(date) ? setTime : ''}
        
        </h2>
        </figure>
        <div class="flex items-start py-5 px-4">
            <div class="p-3">
                <img class="w-[60px] h-[50px] rounded-full object-cover" src="${contentData.authors[0].profile_picture}" alt="profile picture">
            </div>
            <div class="w-10/12 p-3">
                <h2 class="text-lg font-bold">${contentData.title}</h2>
                <h3 class="text-lg text-[#5D5D5D]">${contentData.authors[0].profile_name} <span>${contentData.authors[0].verified === true ? `<img class="w-4 inline-block" src="img/blu-batch.png" alt="blu-batch">` : ''}</span>  </h3>
                
                <p class="text-lg text-[#5D5D5D]">${contentData.others.views}</p>
            </div>
        </div>
        `;

        contentCardCon.appendChild(contentDiv);

    });



}


// defult function call

// handleContentCard('1000');
loadContent();
getContentData(1000);