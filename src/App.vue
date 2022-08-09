<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center"></div>

      <v-spacer></v-spacer>

      <v-btn icon @click="toggleAddIncomeDialog()">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn icon @click="refreshData">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-data-table
        :headers="headers"
        :items="items"
        item-key="id"
        class="elevation-0"
      >
        <!-- https://stackoverflow.com/a/63309643/4670905 -->
        <template #[`item.actions`]="{ item }">
          <v-icon small @click="openIncomeEditForm(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteIncome(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>

      <income-chart :income-items="items" />

      <v-dialog v-model="isAddDialogOpen" persistent max-width="600px">
        <income-add-form
          :item="editItem"
          @toggle-dialog="toggleAddIncomeDialog"
          @add-income="addIncome"
          @edit-income="editIncome"
        />
      </v-dialog>

      <v-snackbar v-model="isErrorMsgVisible">
        {{ errorMessage }}

        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="errorMessage = ''">
            Dismiss
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import IncomeChart from './components/IncomeChart.vue'
import IncomeAddForm from './components/IncomeAddForm.vue'

export default {
  name: 'App',

  components: {
    IncomeChart,
    IncomeAddForm
  },

  mounted: function () {
    this.refreshData()
  },

  data: () => ({
    isAddDialogOpen: false,

    errorMessage: '',

    headers: [
      { text: 'Description', value: 'name' },
      { text: 'Amount', value: 'init_amount' },
      { text: 'From Age', value: 'start_age' },
      { text: 'Income Grows To', value: 'final_amount' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],

    items: [],

    editItem: {}
  }),

  computed: {
    isErrorMsgVisible: {
      get: function () {
        return !!this.errorMessage
      },
      set: function () {
        //
      }
    }
  },

  methods: {
    toggleAddIncomeDialog: function () {
      this.editItem = {}
      this.isAddDialogOpen = !this.isAddDialogOpen
    },

    dismissErrorMsg: function () {
      this.errorMessage = ''
    },

    openIncomeEditForm: function (item) {
      this.editItem = item
      this.isAddDialogOpen = true
    },

    addIncome: function (values) {
      this.$axios
        .post('/income/', values)
        .then(this.axiosSuccessHandler)
        .catch(this.axiosErrorHandler)
        .finally(() => this.toggleAddIncomeDialog())
    },

    editIncome: function ({ id, values }) {
      this.$axios
        .put(`/income/${id}`, values)
        .then(this.axiosSuccessHandler)
        .catch(this.axiosErrorHandler)
        .finally(() => {
          this.toggleAddIncomeDialog()
          this.editItem = {}
        })
    },

    deleteIncome: function ({ id }) {
      this.$axios
        .delete(`/income/${id}`)
        .then(this.axiosSuccessHandler)
        .catch(this.axiosErrorHandler)
        .finally(() => this.refreshData())
    },

    axiosSuccessHandler: function (response) {
      if (response.status >= 200 && response.status <= 299) {
        this.refreshData()
      } else {
        console.debug(response)
      }
    },

    axiosErrorHandler: function (error) {
      if (error.response) {
        this.errorMessage = `${error.response.statusText}: Check console for details`

        console.debug(error.response.data)
      } else {
        this.errorMessage = `Request Error: ${error.message}`
        console.debug(error)
      }
    },

    refreshData: function () {
      this.$axios
        .get('/income/')
        .then((resp) => {
          if (resp.data) {
            this.items = resp.data
          }
        })
        .catch((error) => console.debug(error))
        .finally()
    }
  }
}
</script>
