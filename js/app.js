d3.json("../data/samples.json").then((data) => {
    console.log(data);
    console.log(data.samples[0]);
    var otu_ids = data.samples[0].otu_ids;
    console.log(otu_ids)
    var sample_values = data.samples[0].sample_values;
    console.log(sample_values);
    var otu_labels = data.samples[0].otu_labels;
    var top_labels = otu_labels.slice(0,10).reverse();
    console.log(top_labels);
    var top_values = sample_values.slice(0,10).reverse();
    console.log(top_values)
    var top_ids = otu_ids.slice(0,10).reverse();
    console.log(top_ids)
    var ids = top_ids.map(name => "OTU "+name);
    console.log(ids)

// bar chart
var trace1 = {
    x: top_values,
    y: ids,
    type: "bar",
    orientation: 'h',
    name:top_labels
  };
  
  var data = [trace1];
  
  var layout = {
    title: "test",
    xaxis:{title: "Sample Values"},
    yaxis: {title:"OTU IDS"}
  };
  
  Plotly.newPlot("bar", data, layout);
});
  