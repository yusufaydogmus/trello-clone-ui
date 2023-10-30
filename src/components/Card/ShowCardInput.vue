<script lang="ts">
import { defineComponent } from 'vue';
import DxTextBox from 'devextreme-vue/text-box';
import Modal from "../components/Card/Modal.vue"; // Modal bileşenini içe aktar
import CardInput from "../components/Card/CardInput.vue";

interface CardItem {
  name: string;
  listeName: string;
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
  showCardInput: boolean; // Her liste öğesi için showCardInput verisi
}

export default defineComponent({
  data() {
    return {
      activeBoardId: "",
      activeBoardName: "",
      listItem: {
        items: [] as CardItem[],
        totalCount: 0,
      } as ListItem,
      isModalOpen: false,
      selectedCard: null as CardItem | null,
    };
  },
  components: {
    DxTextBox,
    Modal, // Modal bileşenini kullanılabilir hale getir
    CardInput,
  },
  created() {
    this.activeBoardId = localStorage.getItem('activeBoardId');
    this.activeBoardName = localStorage.getItem('activeBoardName');
    this.fetchListItems();
  },
  methods: {
    fetchListItems() {
      this.$appAxios.get(`/liste?BoardId=${this.activeBoardId}`).then((response) => {
        // Her liste öğesi için showCardInput verisini başlangıçta false olarak ayarlayın
        this.listItem.items = response.data.items.map((item: ListItem) => ({
          ...item,
          showCardInput: false,
        }));
      });
    },
    handleCardClick(card: CardItem) {
      // Kartın tıklanabilir olduğunda yapılacak işlemi buraya ekleyin.
      console.log('Tıklanan Kart:', card);
      this.selectedCard = card;
      this.isModalOpen = true;
    },
    closeModal() {
      this.selectedCard = null;
      this.isModalOpen = false;
    },
    // Her liste öğesi için showCardInput verisini değiştiren metod
    toggleCardInput(listItem: ListItem) {
      listItem.showCardInput = !listItem.showCardInput;
    },
  },
});
</script>
