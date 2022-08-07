<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Add Income</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="name"
              label="Income Description"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="init_amount"
              label="Annual Amount"
              prefix="$"
              hint="Such as Salary"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="start_age"
              label="When doesn your income being?"
              hint="Enter an age"
              suffix="years old"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="final_amount"
              label="Does this income grow over time? If so, how high will this be when you're 65?"
              prefix="$"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click="cancelHandler()">Cancel</v-btn>
      <v-btn text @click="submitHandler()">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'IncomeAddForm',

  mounted: function () {
    this.initializeForm()
  },

  props: {
    item: Object
  },
  
  watch: {
    item: function() {
      this.initializeForm()
    }
  },

  data: () => ({
    id: 0,
    name: '',
    init_amount: 0,
    final_amount: 0,
    start_age: 0
  }),

  methods: {
    initializeForm: function () {
      // initialize the fields with prop data if not empty

      (this.id = this.item.id || 0),
        (this.name = this.item.name || ''),
        (this.init_amount = this.item.init_amount || 0),
        (this.final_amount = this.item.final_amount || 0),
        (this.start_age = this.item.start_age || 0)
    },

    resetForm: function () {
      this.id = 0
      this.name = ''
      this.init_amount = 0
      this.final_amount = 0
      this.start_age = 0
    },

    cancelHandler: function () {
      this.resetForm()
      this.$emit('toggle-dialog')
    },

    submitHandler: function () {
      if (this.id == 0) {
        this.$emit('add-income', {
          name: this.name,
          init_amount: parseInt(this.init_amount),
          final_amount: parseInt(this.final_amount),
          start_age: parseInt(this.start_age),
        })
      } else {
        this.$emit('edit-income', {
          id: this.id,
          values: {
            name: this.name,
            init_amount: parseInt(this.init_amount),
            final_amount: parseInt(this.final_amount),
            start_age: parseInt(this.start_age),
          }
        })
      }
    }
  }
}
</script>

<style>
</style>