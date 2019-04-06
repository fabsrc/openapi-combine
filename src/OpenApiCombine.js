const SwaggerParser = require('swagger-parser')
const converter = require('swagger2openapi')

class OpenApiCombine {
  static async combine(schema, options = {}) {
    try {
      const bundledSchema = await SwaggerParser.bundle(schema, options)
      let combineSchemas = []

      if (bundledSchema['x-combine']) {
        combineSchemas = bundledSchema['x-combine']

        // Resolve schemas
        await Promise.all(combineSchemas.map(async (combineSchema) => {
          if (combineSchema.url) {
            combineSchema.resolvedSchema = await SwaggerParser.bundle(combineSchema.url, options)
          }
        }))

        // Convert schemas to OAS 3.0
        await Promise.all(combineSchemas.map(async (combineSchema) => {
          if (combineSchema.resolvedSchema) {
            const {
              openapi
            } = await converter.convertObj(combineSchema.resolvedSchema, {})
            combineSchema.resolvedAndConvertedSchema = openapi
          }
        }))

        console.log(combineSchemas)
      }
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = OpenApiCombine