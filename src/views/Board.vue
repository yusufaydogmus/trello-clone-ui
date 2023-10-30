<template>
  <div class=" w-full h-full"
  :class="{ 'inset-0  opacity-10': isModalOpen }" @dblclick="openAddList">
    <DxTextBox
       :value="activeBoardName" 
       v-show="false"
       
       />
  <div class="board-name-header bg-gray-900/10 p-2 mb-5">
    <BoardEditName :item="boardItem"  />
  </div>
    <div class=" p-5 ml-4 flex-wrap w-full">
        <div class="board flex  ">
          <DxScrollView
          class="scrollable-board"
          direction="horizontal"
          show-scrollbar="always"
          >
        <DxSortable
          class="sortable-lists flex "
          item-orientation="horizontal"
          group="listGroup"
          :data="listItem.items"
          @drag-start="onTaskDragStart($event)"
              @reorder="onTaskDrop($event)"
              @add="onTaskDrop($event)"
        >
          <div
            v-for="(listItem, index) in listItem.items"
            :key="listItem.id"
            class=" px-4 "
          >
          <div class="bg-gray-100 rounded-3xl shadow-md mb-4 ">
            <div class="  p-4">
              
              <div class="list-container-top flex ">
                <div class="list-container-header p-1 pb-2 m-1 flex-auto">
                  <ListEditName :item="listItem" class="list-container-name"  />
                </div>
                <div class="list-container-delete-icon text-lg">
                  <button class=" bg-transparent  text-gray-100 hover:text-red-600   hover:border-transparent  " @click="deleteListItem(listItem.id)">
                   <i class="fa fa-times " aria-hidden="true"></i>
                  </button>
                </div>
              </div>
              
              <div class=" h-min max-h-96 w-52  space-y-2 overflow-y-auto   list-content-container">
               
                <DxSortable
          class=" flex-nowrap px-2"
          group="cardGroup"
          :data="listItem.cards"
          @drag-start="onTaskDragStartForCard($event)"
              @reorder="onTaskDropForCard($event)"
              @add="onTaskDropForCard($event)"
        >
                  <div
                    v-for="card in listItem.cards"
                    :key="card.id"
                    class="bg-white p-3 rounded-2xl shadow-sm cursor-pointer mb-3 mt-1"
                    @click="handleCardClick(card)"
                    style="font-size: 12px;"
                  >
                    <p class="text-sm overflow-x-hidden">{{ card.name }}</p>

                  </div>
                    </DxSortable>
                  <CardInput :hasDescription="false" :listeId="listItem.id" v-if="listItem.showCardInput" @add-card="saveCard" @closeCardInput="closeCardInput(listItem)"
                   />

              </div>
            </div>
            <div class="add-kart px-3 pb-2 ">
              <button @click="toggleCardInput(listItem)"   class="bg-gray-300 text-gray-400 font-semibold  w-full  inline-flex items-center flex transition hover:bg-gray-400 hover:text-black hover:ease-in-out hover:duration-500 hover:border-none hover:rounded-xl">
              <i class="fa fa-plus-square fill-current w-4 h-4" aria-hidden="true"></i>
              <span>Kart Ekle</span>
            </button>
            </div>

          </div>
        </div>
      </DxSortable>
    </DxScrollView>
        <div>
          <!-- Yeni Liste Ekleme İşlemi -->
         <AddList v-if="isAddListOpen" @close-add-list="closeAddList"/>
          <button v-else  class=" w-44 bg-slate-400/20 hover:bg-gra  text-gray-400 font-semibold ms-2 my-1   h-12 rounded" @click="openAddList">
            <i class="fa fa-plus-square fill-current w-4 h-4 mr-2" aria-hidden="true"></i>
            <span class="text-xs">Başka Liste Ekleyin</span>
          </button>
        </div>

      </div>
    </div>
  </div>
  <!-- CardDetails bileşenini kullanma karta tıklanınca açılan bölüm -->
  <CardDetails :isOpen="isModalOpen" :selectedCard="selectedCard" @close="closeModal(selectedCard)" />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import DxTextBox from 'devextreme-vue/text-box';
import CardDetails from "../components/Card/CardDetails.vue"; 
import CardInput from "../components/Card/CardInput.vue";
import { DxScrollView } from 'devextreme-vue/scroll-view';
import { DxSortable } from 'devextreme-vue/sortable';
import AddList from "../components/List/AddList.vue"
import ListEditName from "../components/List/ListEditName.vue"
import BoardEditName from "../components/Board/BoardEditName.vue"

interface Board {
  id: string;
  name: string;
}

interface CardItem {
  name: string;
  listeId: string;
  position:number;
  description: string;
  id: string;
}

interface ListItem {
  name: string;
  position: number;
  cards: CardItem[];
  id: string;
  showCardInput: boolean;
}

export default defineComponent({
  data() {
    return {
      activeBoardId: "",
      activeBoardName: "",
      isEditingListName: false,
      listItem: {
        items: [] as ListItem[],
        totalCount: 0,
      } as ListItem,
      boardItem: {} as Board,
      isModalOpen: false,
      selectedCard: null as CardItem | null,
      appAxios: inject("appAxios"),
      newListName: "",
      isAddListOpen: false,
    };
  },
  components: {
    DxTextBox,
    CardDetails,
    CardInput,
    DxScrollView,
    DxSortable,
    AddList,
    ListEditName,
    BoardEditName,
  },
  created() {
    this.activeBoardId = localStorage.getItem('activeBoardId');
    this.activeBoardName = localStorage.getItem('activeBoardName');
    this.boardItem.name = this.activeBoardName;
    this.boardItem.id = this.activeBoardId;
    this.fetchListItems();
  },

  methods: {
    fetchListItems() {
      this.appAxios.get(`/liste?BoardId=${this.activeBoardId}&SkipCount=0&MaxResultCount=100`).then((response) => {
        console.log('response', response)
        this.listItem.items = response.data.items.map((item: ListItem) => ({
          ...item,
          showCardInput: false,
          isEditing: false,
        }));
      });
    },
    deleteListItem(listId:string){
this.appAxios.delete(`/liste/${listId}`);
    },

    handleCardClick(card: CardItem) {
      this.selectedCard = card;
      this.isModalOpen = true;
    },

    closeModal(card) {
      this.appAxios.put(`/card/${card.id}`, 
      {
        name:card.name,
        description:card.description,
        listeId:card.listeId,
        position:card.position
      }).then((update_response) => {
        console.log(update_response);
      });
      this.selectedCard = null;
      this.isModalOpen = false;
    },
    closeCardInput(listItem){
      console.log("çalıştı mı ?")
      listItem.showCardInput=false;
    },

    openAddList() {
      this.isAddListOpen = true;
    },

    closeAddList() {
      this.isAddListOpen = false;
      this.fetchListItems();
    },

    onTaskDragStart(e) {
      console.log('e', e);
      console.log('e.fromIndex', e.fromIndex);
      console.log('e.toIndex', e.toIndex);
    },

    onTaskDrop(e) {
      console.log('Başlangıç indeksi:', e.fromIndex);
      console.log('Bitiş indeksi:', e.toIndex);

      const startIndex = e.fromIndex;
      const endIndex = e.toIndex;

      const startList = this.listItem.items[startIndex];
      const endList = this.listItem.items[endIndex];

      console.log('Başlangıç liste:', startList);

      // Optimistik kilitleme: Başlangıç ve bitiş indekslerine göre ilgili listeleri güncellemeden önce kontrol edin

      this.$nextTick(() => {
        this.updateListPosition(startList, endIndex);
        this.updateListPosition(endList, startIndex);
        
        });
        setTimeout(()=>{
          this.fetchListItems();
        },100);

      console.log('Bitiş liste:', endList);
    },
    
    onTaskDragStartForCard(e) {
      e.itemData = e.fromData[e.fromIndex];
      console.log('e', e);
      console.log('e.fromIndex', e.fromIndex);
      console.log('e.toIndex', e.toIndex);
    },

    onTaskDropForCard(e) {
  //console.log('Başlangıç indeksi:', e.fromIndex);
  //console.log('Bitiş indeksi:', e.toIndex);

  const startIndex = e.fromIndex;
  const endIndex = e.toIndex;

  // Kartların bulunduğu liste
  const currentList = this.listItem.items.find(list => list.id === e.fromData[0].listeId);

  // Sıralanacak olan kart
  const cardToMove = currentList.cards[startIndex];
  //console.log('taşınan kart', cardToMove)
  const cardToChanged=currentList.cards[endIndex];
  //console.log('cardToChanged', cardToChanged)
  // Kartı mevcut listeden kaldırın
  // currentList.cards.splice(startIndex, 1);

  // Hedef listeyi bulun
  const targetList = this.listItem.items.find(list => list.id === e.toData[0].listeId);

  // // Hedef listeye kartı ekleyin
  // targetList.cards.splice(endIndex, 0, cardToMove);

  // // Kartın pozisyonunu güncelleyin
  // cardToMove.position = endIndex;

  console.log('id',currentList.id )
  console.log("end",endIndex);
  console.log("endListId",targetList.id)
  console.log("start",startIndex)

  this.appAxios.put(`/liste/${currentList.id}/card-positions`,
  {
   endListId:targetList.id,
   start:startIndex+1,
   end:endIndex+1 
  })
// Kartın veritabanını güncelleyin veya API'yi arayın
  // this.appAxios.put(`/card/${cardToMove.id}`, 
  //     {
  //       name:cardToMove.name,
  //       description:cardToMove.description,
  //       listeId:cardToMove.listeId,
  //       position:cardToMove.position
  //     }).then((update_response) => {
  //       console.log(update_response);
  //     });

  //this.updateCardPosition(cardToMove);
  // Kartların sıralamasını güncellemek için API'yi çağırın veya yerel sıralamayı güncelleyin

},


//https://localhost:44373/api/app/liste/3a0e125f-ef1b-f1ff-87d7-986ce4fce14a/card-positions


    updateListPosition(updatedItem: ListItem, position: number) {
      this.appAxios.put(`/liste/${updatedItem.id}`, { 
        name: updatedItem.name, 
        position: position, 
        boardId: this.activeBoardId 
      }).then((update_response) => {
        console.log('update_response', update_response);
      });
    },

    toggleCardInput(listItem: ListItem) {
      listItem.showCardInput = !listItem.showCardInput;
      this.listItem.items.forEach((item: ListItem) => {
        if (item !== listItem) {
          item.showCardInput = false;
        }
      });
    },

    saveCard(cardItem) {
      console.log("kaydedilecek olan card", cardItem);
      this.appAxios.post("/card", cardItem).then(save_card_response => {
        console.log('save_card_response', save_card_response);
      });
    }, 
  },
});
</script>

<style scoped>



</style>