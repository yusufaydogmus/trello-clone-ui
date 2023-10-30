<template>
  <div class="container bg-gray-400 text-slate-950">
      <div class="row justify-content-center">
          <div class="col-md-8">
              <div class="card mt-2">
                  <div class="card-header">Form In Vue Js</div>

                  <div class="card-body mt-2">
                      <div class="row">
                          <div class="col-md-12">
                              <Form @submit="handleSubmit" :validation-schema="schema">
                                  <div class="form-group">
                                      <label>Name</label>
                                      <Field type="text" class="form-control" name="name" />
                                      <ErrorMessage name="name" class="text-danger"/>
                                  </div>

                                  <div class="form-group">
                                      <label>Email</label>
                                      <Field type="email" class="form-control" name="email"   />
                                      <ErrorMessage name="email" class="text-danger"/>
                                  </div>

                                  <div class="form-group">
                                      <label>Phone</label>
                                      <Field type="tel" class="form-control" name="phone"   />
                                      <ErrorMessage name="phone" class="text-danger"/>
                                  </div>

                                  <div class="form-group">
                                      <label>Message</label>
                                      <Field as="textarea" class="form-control" name="message"   />
                                      <ErrorMessage name="message" class="text-danger"/>
                                  </div>
                                 
                                  <button class="btn btn-primary mt-2">
                                      Submit
                                  </button>
                              </Form>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import axios from 'axios';

export default {
  components: { Form, Field, ErrorMessage },
  mounted() {
      console.log("Component mounted.");
  },
  data() {
      const schema = yup.object({
          name: yup.string().required(),
          email:  yup.string().required().email(),
          phone:  yup.string().required(),
          message:  yup.string().required(),
      });
      return {
          schema
      };
  },
  methods: {
      handleSubmit(values)
      {
          console.log(values);
          //need to submit form
          // axios.post('http://localhost:8001/api/contact-form-save', values).then(res =>{
          //     console.log('res');
          //     console.log(res);
          // }).catch(err => {
          //     console.log(err);
          // })
      }
  }
};
</script>