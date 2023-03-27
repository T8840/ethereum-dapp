import { supabase } from './dataClient'


import { fetchUtils } from "react-admin";
import { stringify } from "query-string";
const httpClient = fetchUtils.fetchJson;

const dataProvider =  {
  getList: async (resource, params) => {
      return supabase
        .from(resource)
        .select('*')
        .range(params.pagination.page-1, params.pagination.page + params.pagination.perPage - 1)
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message);
          }
          return {
            data: data,
            total: parseInt(params.pagination.perPage),
          };
        });
    },

    getOne: (resource, params) => {

      return supabase
        .from(resource)
        .select('*')
        .eq('id', params.id)
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message);
          }
          return {
            data: data[0],
          };
        });
      },
    getMany: (resource, params) => {  
      return supabase
        .from(resource)
        .select('*')
        .range(params.pagination.page, params.pagination.page + params.pagination.perPage - 1)
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message);
          }
          return {
            data: data,
            total: parseInt(params.pagination.perPage),
          };
        });
      },
    getManyReference: (resource, params) => {  
      return supabase
        .from(resource)
        .select('*')
        .range(params.pagination.page, params.pagination.page + params.pagination.perPage - 1)
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message);
          }
          return {
            data: data,
            total: parseInt(params.pagination.total),
          };
        });  
     }, 
    create: (resource, params) => {
      console.log("Inserting data:", params.data);

      return supabase
        .from(resource)
        .insert(params.data, { returning: 'representation' })
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message);
          } 
          if (!data || data.length === 0) {
            throw new Error('No data returned after insert.');
          }
          return {
            data: { ...params.data, id: data[0].id },
          };
        });
     }, 
    update: (resource, params) => {
      return supabase
        .from(resource)
        .update(params.id, params.data)
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message);
          }
          return {
            data: { ...params.data, id: params.id },
          };
        });
    },
    updateMany: (resource, params) => {
     return supabase
        .from(resource)
        .update(params.id, params.data)
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message);
          }
          return {
            data: { ...params.data, id: params.id },
          };
        });
    },
    delete: (resource, params) => {
      return supabase
        .from(resource)
        .delete()
        .eq('id', params.id)
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message);
          }
          return {
            data: { id: params.id },
          };
        });
      },
  deleteMany: (resource, params) => {
     return supabase
        .from(resource)
        .delete()
        .eq('id', params.id)
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message);
          }
          return {
            data: { id: params.id },
          };
        });
      },
  
};

export default dataProvider;


