<template>
  <div class="history">
    <v-card flat dark class="px-5 py-5 pb-10" style="margin-top: -3px">
      <v-row class="mt-2">
        <v-col>
          <h1>Recent Scans</h1>
          <p>List of all scans shit</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xl="4" lg="4" md="6" xs="6" sm="6">
          <v-card class="mx-auto" light>
            <v-list-item two-line>
              <v-list-item-avatar tile size="80">
                <img
                  src="https://media0.giphy.com/media/16dIgjWQjikY8/200w.webp?cid=ecf05e475kcfy91yvnmc82qh37oqlj7biq4u0n2lbj9p6ugj&rid=200w.webp&ct=g"
                  alt=""
                />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  <span class="font-weight-bold">
                    {{ this.scanned.length }}</span
                  >
                  Scanned Items
                </v-list-item-title>
                <v-list-item-subtitle
                  >Greyhound divisely hello coldly
                  fonwderfully</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <v-card
      flat
      class="px-5 py-5"
      style="
        border-top-right-radius: 23px;
        border-top-left-radius: 23px;
        margin-top: -20px;
      "
    >
      <v-data-iterator
        class="mb-10"
        :items="scanned"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
      >
        <template v-slot:header>
          <v-row>
            <v-col>
              <v-text-field
                v-model="search"
                clearable
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Search"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-magnify"
                label="Sort by"
              ></v-select>
            </v-col>

            <v-col>
              <v-btn-toggle v-model="sortDesc" mandatory>
                <v-btn block large dark :value="false">
                  <v-icon color="white">mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn block large light :value="true">
                  <v-icon color="black">mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
        </template>

        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="item in props.items"
              :key="item.scanned_id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card
                class="mt-5 px-5"
                elevation="4"
                @click="loadItem(item.scanned_id)"
              >
                <v-row>
                  <v-col cols="9">
                    <v-list-item three-line style="padding: 0">
                      <v-list-item-avatar size="64" tile>
                        <v-img
                          style="width: 100%"
                          :src="'http://localhost:3001/' + item.scanned_img"
                          :alt="item.scanned_img"
                        />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.scanned_name }}
                        </v-list-item-title>
                        <v-list-item-subtitle>{{
                          item.scanned_created
                        }}</v-list-item-subtitle
                        ><v-list-item-subtitle>{{
                          item.scanned_time
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </template>

        <template v-slot:no-data>
          <v-card class="px-10 py-10 mt-5">
            <v-row class="justify-center align-center">
              <v-col class="text-center">
                <h1 class="text-uppercase title">No data available</h1>
                <p class="text--secondary">
                  Your scanned items will display here
                </p>
                <img
                  style="width: 100%"
                  src="https://i.pinimg.com/originals/8e/a3/f8/8ea3f820b1ef8cf4b04cecb098c43709.gif"
                  alt=""
                />
              </v-col>
            </v-row>
          </v-card>
        </template>

        <template v-slot:no-results>
          <v-card class="px-10 py-10 mt-5">
            <v-row class="justify-center align-center">
              <v-col class="text-center">
                <h1 class="text-uppercase title">No results found</h1>
                <p class="text--secondary">
                  Your scanned items will display here
                </p>
                <img
                  style="width: 100%"
                  src="https://i.pinimg.com/originals/19/c2/d0/19c2d0843f5c5e952c5ae50af9678fd1.gif"
                  alt=""
                />
              </v-col>
            </v-row>
          </v-card>
        </template>

        <template v-slot:footer>
          <v-row class="mt-5 mx-1" align="center" justify="center">
            <span class="grey--text">Items per page</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  dark
                  text
                  color="primary"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ itemsPerPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-spacer></v-spacer>

            <span class="mr-4 grey--text">
              Page {{ page }} of {{ numberOfPages }}
            </span>
            <v-btn small dark class="mr-1" @click="formerPage">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn small dark class="ml-1" @click="nextPage">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-iterator>
    </v-card>

    <v-dialog
      v-if="scanned.length != 0"
      v-model="itemDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark>
          <v-btn icon dark @click="itemDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="itemDialog = false"> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title
              ><h1 class="title">
                {{ this.scanned[itemIndex].scanned_name }}
                <!-- {{ this.scanned[itemIndex].scanned_results }} -->
              </h1></v-list-item-title
            >
            <v-list-item-subtitle>Name</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn text @click="confirmDialog = true">
              <v-icon>mdi-trash-can</v-icon></v-btn
            >
          </v-list-item-action>
        </v-list-item>

        <v-divider></v-divider>

        <v-list three-line subheader>
          <v-subheader>General Information</v-subheader>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Result</v-list-item-title>
              <v-list-item-subtitle>
                {{ this.scanned[itemIndex].scanned_result }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Description</v-list-item-title>
              <v-list-item-subtitle>
                {{ this.scanned[itemIndex].scanned_desc }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Date Captured</v-list-item-title>
              <v-list-item-subtitle>
                {{ this.scanned[itemIndex].scanned_created }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Time Captured</v-list-item-title>
              <v-list-item-subtitle>
                {{ this.scanned[itemIndex].scanned_time }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list three-line subheader>
          <v-subheader>Captures</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>QR code/Barcode</v-list-item-title>
              <v-list-item-subtitle
                >Notify me about updates to apps or games that I
                downloaded</v-list-item-subtitle
              >
              <qrcode :data="this.scanned[itemIndex].scanned_name" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Captured Item</v-list-item-title>
              <v-list-item-subtitle
                >Auto-update apps at any time. Data charges may
                apply</v-list-item-subtitle
              >
              <v-img
                class="mt-5"
                size="500"
                :src="
                  'http://localhost:3001/' + this.scanned[itemIndex].scanned_img
                "
              ></v-img>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>

      <v-dialog v-model="confirmDialog" persistent max-width="290">
        <v-card>
          <v-card-title class="title">
            Are you sure you want to delete this record?
          </v-card-title>
          <v-card-text>This action cannot be undone.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="itemDialog = false">
              Cancel
            </v-btn>
            <v-btn
              color="red "
              dark
              @click="onDelete(scanned[itemIndex].scanned_id)"
            >
              DELETE
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-dialog>
    <v-snackbar v-model="snackbar" true>
      asdsad

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import axios from "axios";
import qrcode from "@/components/qrcode.vue";

export default {
  components: {
    qrcode
  },
  data() {
    return {
      name: "",
      confirmDialog: false,
      itemDialog: false,
      snackbar: false,
      itemIndex: 0,
      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 8,
      sortBy: "name",
      keys: ["Name", "Date added"]
    };
  },
  computed: {
    scanned() {
      return this.$store.state.scanned;
    },
    numberOfPages() {
      return Math.ceil(this.scanned.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter(key => key !== "Name");
    }
  },
  methods: {
    onDelete(index) {
      console.log(index);
      console.log(index);
      console.log(index);
      console.log(index);
      console.log(index);
      console.log(index);
      console.log(index);
      console.log(index);
      console.log(index);
      const get_index = this.scanned.map(el => el.scanned_id).indexOf(index);
      axios.delete("http://localhost:3001/scans/" + index).then(
        response => {
          console.log(response);
          this.$store.commit("deleteScanned", get_index);
          this.itemDialog = false;
          this.snackbar = true;
        },
        error => {
          console.log(error);
        }
      );
    },
    loadItem(index) {
      const get_index = this.scanned.map(el => el.scanned_id).indexOf(index);
      this.itemIndex = get_index;
      this.itemDialog = true;
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    }
  }
};
</script>
