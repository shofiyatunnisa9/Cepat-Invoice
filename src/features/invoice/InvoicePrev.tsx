import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    lineHeight: 1.4,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottom: "1 solid #ccc",
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box: {
    width: "48%",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#E5E7EB",
    padding: 5,
    fontWeight: "bold",
    borderBottom: "1 solid #999",
  },
  tableRow: {
    flexDirection: "row",
    padding: 5,
    borderBottom: "1 solid #eee",
  },
  cell: {
    flex: 1,
  },
  totalBox: {
    alignSelf: "flex-end",
    width: "50%",
    marginTop: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalBold: {
    marginTop: 5,
    borderTop: "1 solid #000",
    fontWeight: "bold",
  },
});

// 2. Create PDF Document Component
export function PdfDocumentPrev() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.heading}>
          <View>
            <Text>Date :</Text>
            <Text>Invoice Number : </Text>
          </View>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.title}>Cepat</Text>
          <Text style={{ marginTop: "5px" }}>Invoice</Text>
        </View>
        {/* customer dan from info */}
        <View style={styles.grid}>
          <View style={styles.box}>
            <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
              Customer:
            </Text>
            <Text>Name Customer</Text>
            <Text>Address</Text>
            <Text>Phone</Text>
          </View>

          <View style={styles.box}>
            <Text style={{ fontWeight: "bold", marginBottom: 4 }}>From:</Text>
            <Text>Cepat Invoice Business</Text>
            <Text>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
              iusto atque quam at iure minus numquam molestias.
            </Text>
            <Text>(+62) 123-4567</Text>
          </View>
        </View>

        {/* Info Item */}
        <View style={[styles.section, { marginTop: 10 }]}>
          <View style={styles.tableHeader}>
            <Text style={[styles.cell]}>Product</Text>
            <Text style={[styles.cell, { textAlign: "right" }]}>Price</Text>
            <Text style={[styles.cell, { textAlign: "right" }]}>Quantity</Text>
            <Text style={[styles.cell, { textAlign: "right" }]}>Total</Text>
          </View>

          {/* Exxample Item */}
          <View style={styles.tableRow}>
            <Text style={[styles.cell]}>Product A</Text>
            <Text style={[styles.cell, { textAlign: "right" }]}>Rp10.000</Text>
            <Text style={[styles.cell, { textAlign: "right" }]}>2</Text>
            <Text style={[styles.cell, { textAlign: "right" }]}>Rp20.000</Text>
          </View>
        </View>

        {/* Total */}
        <View style={styles.totalBox}>
          <View style={styles.totalRow}>
            <Text>Original Price</Text>
            <Text>Rp20.000</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Discount</Text>
            <Text>0%</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Discounted Price</Text>
            <Text>Rp20.000</Text>
          </View>
          <View style={[styles.totalRow, styles.totalBold]}>
            <Text>Total</Text>
            <Text>Rp20.000</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
